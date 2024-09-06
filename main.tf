terraform {
  required_version = ">= 0.11.1"
}

variable "location" {
  description = "Azure location in which to create resources"
  default     = "East US"
}

variable "windows_dns_prefix" {
  description = "DNS prefix to add to public IP address for Windows VM"
}

variable "admin_password" {
  description = "admin password for Windows VM"
  default     = "pTFE1234!"
}

module "windowsserver" {
  source              = "Azure/compute/azurerm"
  version             = "1.1.5"
  location            = "${var.location}"
  resource_group_name = "${var.windows_dns_prefix}-rc"
  vm_hostname         = "pwc-ptfe"
  admin_password      = "${var.admin_password}"
  vm_os_simple        = "WindowsServer"
  public_ip_dns       = ["${var.windows_dns_prefix}"]
  vnet_subnet_id      = "${module.network.vnet_subnets[0]}"
}

module "network" {
  source              = "Azure/network/azurerm"
  version             = "1.1.1"
  location            = "${var.location}"
  resource_group_name = "${var.windows_dns_prefix}-rc"
  allow_ssh_traffic   = true
}

# Key Vault
resource "azurerm_key_vault" "example" {
  name                = "examplekeyvault"
  resource_group_name = azurerm_resource_group.example.name
  location            = azurerm_resource_group.example.location
  sku_name             = "standard"
  tenant_id           = data.azurerm_client_config.example.tenant_id
  object_id           = data.azurerm_client_config.example.object_id
}

resource "azurerm_key_vault_key" "example" {
  name         = "example-key"
  key_vault_id = azurerm_key_vault.example.id
  key_type     = "RSA"
  key_size     = 2048

  # No expiration set means the key will not expire
}
# SQL Server and SQL Database
resource "azurerm_sql_server" "example" {
  name                         = "${var.windows_dns_prefix}-sql"
  resource_group_name           = "${var.windows_dns_prefix}-rc"
  location                     = "${var.location}"
  version                      = "12.0"
  administrator_login           = "sqladmin"
  administrator_login_password  = "H@Sh1CoR3!"
}

resource "azurerm_sql_database" "example" {
  name                = "${var.windows_dns_prefix}-sqldb"
  resource_group_name = "${azurerm_sql_server.example.resource_group_name}"
  location            = "${azurerm_sql_server.example.location}"
  server_name         = "${azurerm_sql_server.example.name}"
  edition             = "Basic"
}

# Kubernetes Cluster (AKS)
resource "azurerm_kubernetes_cluster" "example" {
  name                = "${var.windows_dns_prefix}-aks"
  location            = "${var.location}"
  resource_group_name = "${var.windows_dns_prefix}-rc"
  dns_prefix          = "${var.windows_dns_prefix}"

  default_node_pool {
    name       = "default"
    node_count = 1
    vm_size    = "Standard_DS2_v2"
  }

  service_principal {
    client_id     = var.client_id
    client_secret = var.client_secret
  }

  role_based_access_control {
    enabled = true
  }

  network_profile {
    network_plugin = "azure"
  }
}
resource "azurerm_resource_group" "example" {
  name     = "example-resources"
  location = "East US"
}

resource "azurerm_redis_cache" "example" {
  name                = "example-redis-cache"
  resource_group_name = azurerm_resource_group.example.name
  location            = azurerm_resource_group.example.location
  capacity            = 1
  family              = "C"
  sku                 = "Basic"
  
  enable_non_ssl_port = true

  tags = {
    environment = "Testing"
  }
}
# Application Gateway
resource "azurerm_application_gateway" "example" {
  name                = "${var.windows_dns_prefix}-agw"
  location            = "${var.location}"
  resource_group_name = "${var.windows_dns_prefix}-rc"

  sku {
    name     = "Standard_v2"
    tier     = "Standard_v2"
    capacity = 2
  }

  gateway_ip_configuration {
    name      = "my-gateway-ip-configuration"
    subnet_id = "${module.network.vnet_subnets[0]}"
  }

  frontend_port {
    name = "frontendPort"
    port = 80
  }

  frontend_ip_configuration {
    name                 = "frontendIpConfig"
    public_ip_address_id = azurerm_public_ip.example.id
  }

  backend_address_pool {
    name = "backendAddressPool"
  }

  http_settings {
    name                  = "httpSettings"
    cookie_based_affinity = "Disabled"
    port                  = 80
    protocol              = "Http"
    request_timeout       = 20
  }

  request_routing_rule {
    name                       = "rule1"
    rule_type                  = "Basic"
    http_listener_name         = "httpListener"
    backend_address_pool_name  = "backendAddressPool"
    backend_http_settings_name = "httpSettings"
  }
}

output "windows_vm_public_name" {
  value = "${module.windowsserver.public_ip_dns_name}"
}
