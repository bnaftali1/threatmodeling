// DataAssetsForm.js
import React, { useState, useRef } from "react";
import "./DataAssetsForm.css"; // Import your CSS file

const DataAssetsForm = () => {
  const [showDataAssetsForm, setShowDataAssetsForm] = useState(true);
  const [showTechnicalAssetsForm, setShowTechnicalAssetsForm] = useState(false);
  const [showTrustBoundariesForm, setShowTrustBoundariesForm] = useState(false);
  const [showSharedRuntimesForm, setShowSharedRuntimesForm] = useState(false);
  const [showYamlOutput, setShowYamlOutput] = useState(false);
  const [selectedAssets, setSelectedAssets] = useState([]);

  const handleCheckboxChange = (boundaryIndex, assetId) => {
    setTrustBoundaries((prevTrustBoundaries) =>
      prevTrustBoundaries.map((boundary, index) =>
        index === boundaryIndex
          ? {
              ...boundary,
              technical_assets_inside:
                boundary.technical_assets_inside.includes(assetId)
                  ? boundary.technical_assets_inside.filter(
                      (id) => id !== assetId
                    )
                  : [...boundary.technical_assets_inside, assetId],
            }
          : boundary
      )
    );
  };
  const handleSharedRunTimeCheckboxChange = (boundaryIndex, assetId) => {
    setSharedRuntimes((prevSharedRuntimes) =>
      prevSharedRuntimes.map((boundary, index) =>
        index === boundaryIndex
          ? {
              ...boundary,
              technical_assets_inside:
                boundary.technical_assets_inside.includes(assetId)
                  ? boundary.technical_assets_inside.filter(
                      (id) => id !== assetId
                    )
                  : [...boundary.technical_assets_inside, assetId],
            }
          : boundary
      )
    );
  };
  const [sharedRuntimes, setSharedRuntimes] = useState([
    {
      id: 1,
      name: "",
      description: "",
      tags: [],
      technical_assets_inside: [],
    },
  ]);
  // State for trust boundaries
  // State for trust boundaries
  const [trustBoundaries, setTrustBoundaries] = useState([
    {
      id: 1,
      description: "",
      type: "network-dedicated-hoster",
      tags: [],
      technical_assets_inside: [],
      trust_boundaries_nested: [],
    },
  ]);

  // Function to add more trust boundaries
  const handleAddSharedRuntime = () => {
    setSharedRuntimes((prevSharedRuntimes) => [
      ...prevSharedRuntimes,
      {
        id:
          prevSharedRuntimes.length > 0
            ? prevSharedRuntimes[prevSharedRuntimes.length - 1].id + 1
            : prevSharedRuntimes.length + 1,
        description: "",
        tags: [],
        technical_assets_inside: [],
      },
    ]);
  };
  // Function to add more trust boundaries
  const handleAddTrustBoundary = () => {
    setTrustBoundaries((prevTrustBoundaries) => [
      ...prevTrustBoundaries,
      {
        id:
          prevTrustBoundaries.length > 0
            ? prevTrustBoundaries[prevTrustBoundaries.length - 1].id + 1
            : prevTrustBoundaries.length + 1,
        description: "",
        type: "network-dedicated-hoster",
        tags: [],
        technical_assets_inside: [],
        trust_boundaries_nested: [],
      },
    ]);
  };
  const handleChangeTrustBoundary = (index, event) => {
    const newTrustBoundaries = [...trustBoundaries];
    const { name, value } = event.target;

    // Ensure value is a string
    const updatedValue = typeof value === "object" ? value.join(", ") : value;

    // If the field is an array (like tags), split the value by comma
    newTrustBoundaries[index][name] = Array.isArray(
      newTrustBoundaries[index][name]
    )
      ? updatedValue.split(", ")
      : updatedValue;

    setTrustBoundaries(newTrustBoundaries);
  };
  const handleChangeSharedRuntime = (index, event) => {
    const newTrustBoundaries = [...sharedRuntimes];
    const { name, value } = event.target;

    // Ensure value is a string
    const updatedValue = typeof value === "object" ? value.join(", ") : value;

    // If the field is an array (like tags), split the value by comma
    newTrustBoundaries[index][name] = Array.isArray(
      newTrustBoundaries[index][name]
    )
      ? updatedValue.split(", ")
      : updatedValue;

    setSharedRuntimes(newTrustBoundaries);
  };
  const handleAddSharedRuntime1 = () => {
    setSharedRuntimes([
      ...sharedRuntimes,
      {
        id: `shared-runtime-${sharedRuntimes.length + 1}`,
        description: "",
        tags: [],
        technical_assets_running: [],
      },
    ]);
  };
  const handleChange = (index, event) => {
    const newDataAssets = [...dataAssets];
    newDataAssets[index][event.target.name] = event.target.value;
    setDataAssets(newDataAssets);
  };
  const handleRemoveTrustBoundary = (index) => {
    const updatedTrustBoundaries = [...trustBoundaries];
    updatedTrustBoundaries.splice(index, 1);
    setTrustBoundaries(updatedTrustBoundaries);
  };
  const handleRemoveTechnicalAsset = (index) => {
    const updatedTechnicalAsset = [...technicalAssets];
    updatedTechnicalAsset.splice(index, 1);
    setTechnicalAssets(updatedTechnicalAsset);
  };
  const handleRemoveSharedRunTime = (index) => {
    const updatedSharedRunTime = [...sharedRuntimes];
    updatedSharedRunTime.splice(index, 1);
    setSharedRuntimes(updatedSharedRunTime);
  };
  const handleRemoveDataAssets = (index) => {
    const updatedDataAssetss = [...dataAssets];
    updatedDataAssetss.splice(index, 1);
    setDataAssets(updatedDataAssetss);
  };

  const [dataAssets, setDataAssets] = useState([
    {
      id: 1,
      data_asset_title: "",
      unique_id: "",
      description: "",
      usage: "business",
      tags: [],
      origin: "",
      owner: "",
      quantity: "very-few",
      confidentiality: "public",
      integrity: "archive",
      availability: "archive",
      justificationCia: "",
    },
  ]);
  const [assetId, setAssetId] = useState(2);
  const [nextStep, setNextStep] = useState(false);
  const [technicalAssets, setTechnicalAssets] = useState([
    {
      id: 1,
      title: "",
      unique_id: "",
      description: "",
      type: "process",
      usage: "business",
      used_as_client_by_human: false,
      out_of_scope: false,
      justification_out_of_scope: "",
      size: "component",
      technology: "web-service-rest",
      tags: [],
      internet: false,
      machine: "virtual",
      encryption: "none",
      owner: "",
      confidentiality: "public",
      integrity: "archive",
      availability: "archive",
      justification_cia_rating: "",
      multi_tenant: false,
      redundant: false,
      custom_developed_parts: true,
      data_assets_processed: [],
      data_assets_stored: [],
      data_formats_accepted: [],
      communication_links: [
        {
          description: "",
          protocol: "https",
          authentication: "none",
          authorization: "none",
          tags: [],
          vpn: false,
          ip_filtered: false,
          readonly: false,
          usage: "business",
          data_assets_sent: [],
          data_assets_received: [],
        },
      ],
    },
  ]);
  const [technicalAssetId, setTechnicalAssetId] = useState(2);

  const handleAddDataAsset = () => {
    setDataAssets((prevDataAssets) => [
      ...prevDataAssets,
      {
        id:
          prevDataAssets.length > 0
            ? prevDataAssets[prevDataAssets.length - 1].id + 1
            : prevDataAssets.length + 1,
        data_asset_title: "",
        unique_id: "",
        description: "",
        usage: "business",
        tags: [],
        origin: "",
        owner: "",
        quantity: "very-few",
        confidentiality: "public",
        integrity: "archive",
        availability: "archive",
        justificationCia: "",
      },
    ]);
  };

  const handleChangeDataAsset = (index, event) => {
    const newDataAssets = [...dataAssets];
    newDataAssets[index][event.target.name] = event.target.value;
    setDataAssets(newDataAssets);
  };

  const handleNextStep = () => {
    if (showDataAssetsForm) {
      setShowDataAssetsForm(false);
      setShowTechnicalAssetsForm(true);
    } else if (showTechnicalAssetsForm) {
      setShowTechnicalAssetsForm(false);
      setShowTrustBoundariesForm(true);
    } else if (showTrustBoundariesForm) {
      setShowTrustBoundariesForm(false);
      setShowSharedRuntimesForm(true);
    } else {
      //setNextStep(true); // This should be your existing logic to proceed to the next step
      setShowYamlOutput(true);
    }
  };
  const textAreaRef = useRef(null);
  const handleCopyToClipboard = () => {
    if (textAreaRef.current) {
      textAreaRef.current.select();
      document.execCommand("copy");
    }
  };
  const handleSave = () => {
    const yamlOutput = generateYaml();
    setYamlOutput(yamlOutput);
    setShowYamlOutput(true);
  };
  const [formData, setFormData] = useState({
    sharedRuntimes: [],
    trustBoundaries: [],
    // Add other form data from steps 1 to 4 as needed
  });
  const [yamlOutput, setYamlOutput] = useState("");

  const generateYaml = () => {
    let yamlString = "";
    yamlString += "threagile_version: 1.0.0\n";
    yamlString += "title: Threat Modeling Test\n";
    const today = new Date();
    const formattedDate = `${today.getFullYear()}-${(today.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}`;

    // Define the data structure
    const data = {
      date: formattedDate,
      author: {
        name: "Test Test",
        homepage: "www.test.com",
      },
      management_summary_comment: `Just some <b>more</b> custom summary possible here...`,
      business_criticality: "important",
      business_overview: {
        description: "Some more <i>demo text</i> here and even images...",
        images: [],
      },
      technical_overview: {
        description: "Some more demo text</i> here and even images...",
        images: [],
      },
      questions: {
        "Some question without an answer?": "",
        "Some question with an answer?": `Some answer`,
      },
      abuse_cases: {
        "Some Abuse Case": `Some Description`,
      },
      security_requirements: {
        "Some Security Requirement": `Some Description`,
      },
      tags_available: [
        "aws",
        "aws:apigateway",
        "aws:dynamodb",
        "aws:ebs",
        "aws:ec2",
        "aws:iam",
        "aws:lambda",
        "aws:rds",
        "aws:s3",
        "aws:sqs",
        "aws:vpc",
        "azure",
        "docker",
        "gcp",
        "git",
        "kubernetes",
        "nexus",
        "ocp",
        "openshift",
        "tomcat",
        "some-tag",
        "some-other-tag",
      ],
    };

    // Convert data to YAML format
    for (const [key, value] of Object.entries(data)) {
      yamlString += `${key}:\n`;
      if (typeof value === "object" && !Array.isArray(value)) {
        for (const [innerKey, innerValue] of Object.entries(value)) {
          yamlString += `  ${innerKey}: ${innerValue}\n`;
        }
      } else if (Array.isArray(value)) {
        yamlString += value.map((tag) => `  - ${tag}`).join("\n") + "\n";
      } else {
        yamlString += `  ${value}\n`;
      }
    }
    yamlString += "data_assets:\n";
    dataAssets.forEach((asset, index) => {
      yamlString += `  ${asset.data_asset_title}:\n`;
      yamlString += `      id: ${asset.unique_id}\n`;
      yamlString += `      description: ${asset.description}\n`;
      yamlString += `      usage: ${asset.usage}\n`;
      yamlString += `      tags: ${asset.tags.join(", ")}\n`;
      yamlString += `      owner: ${asset.owner}\n`;
      yamlString += `      quantity: ${asset.quantity}\n`;
      yamlString += `      confidentiality: ${asset.confidentiality}\n`;
      yamlString += `      integrity: ${asset.integrity}\n`;
      yamlString += `      availability: ${asset.availability}\n`;
      yamlString += `      justification_cia_rating: ${asset.justificationCia}\n`;
    });
    yamlString += "technical_assets:\n";
    technicalAssets.forEach((asset, index) => {
      yamlString += `  ${asset.title}:\n`;
      yamlString += `    id: ${asset.unique_id}\n`;
      yamlString += `    description: ${asset.description}\n`;
      yamlString += `    type: ${asset.type}\n`;
      yamlString += `    usage: ${asset.usage}\n`;
      yamlString += `    used_as_client_by_human: ${asset.used_as_client_by_human}\n`;
      yamlString += `    out_of_scope: ${asset.out_of_scope}\n`;
      yamlString += `    justification_out_of_scope: ${asset.justification_out_of_scope}\n`;
      yamlString += `    size: ${asset.size}\n`;
      yamlString += `    technology: ${asset.technology}\n`;
      yamlString += `    tags:\n`;
      asset.tags.forEach((tag) => {
        yamlString += `      - ${tag}\n`; // Add each tag in a nested list
      });
      yamlString += `    internet: ${asset.internet}\n`;
      yamlString += `    machine: ${asset.machine}\n`;
      yamlString += `    encryption: ${asset.encryption}\n`;
      yamlString += `    owner: ${asset.owner}\n`;
      yamlString += `    confidentiality: ${asset.confidentiality}\n`;
      yamlString += `    integrity: ${asset.integrity}\n`;
      yamlString += `    availability: ${asset.availability}\n`;
      yamlString += `    justification_cia_rating: ${asset.justification_cia_rating}\n`;
      yamlString += `    multi_tenant: ${asset.multi_tenant}\n`;
      yamlString += `    redundant: ${asset.redundant}\n`;
      yamlString += `    custom_developed_parts: ${asset.custom_developed_parts}\n`;
      yamlString += `    data_assets_processed:\n`;

      yamlString += `      - ${asset.data_assets_processed}\n`; // Add each processed data asset in a nested list

      yamlString += `    data_assets_stored:\n`;

      yamlString += `      - ${asset.data_assets_stored}\n`; // Add each stored data asset in a nested list

      yamlString += `    data_formats_accepted:\n`;

      yamlString += `      - ${asset.data_formats_accepted}\n`; // Add each accepted format in a nested list

      yamlString += `    communication_links:\n`;
      Object.entries(asset.communication_links).forEach(([key, value]) => {
        yamlString += `      ${key}:\n`;
        yamlString += `        target: ${value.target}\n`;
        yamlString += `        description: ${value.description}\n`;
        yamlString += `        protocol: ${value.protocol}\n`;
        yamlString += `        authentication: ${value.authentication}\n`;
        yamlString += `        authorization: ${value.authorization}\n`;
        yamlString += `        tags:\n`;
        value.tags.forEach((tag) => {
          yamlString += `          - ${tag}\n`; // Add each tag in a nested list
        });
        yamlString += `        vpn: ${value.vpn}\n`;
        yamlString += `        ip_filtered: ${value.ip_filtered}\n`;
        yamlString += `        readonly: ${value.readonly}\n`;
        yamlString += `        usage: ${value.usage}\n`;
        yamlString += `        data_assets_sent:\n`;
        value.data_assets_sent.forEach((dataAsset) => {
          yamlString += `          - ${dataAsset}\n`; // Add each sent data asset in a nested list
        });
        yamlString += `        data_assets_received:\n`;
        value.data_assets_received.forEach((dataAsset) => {
          yamlString += `          - ${dataAsset}\n`; // Add each received data asset in a nested list
        });
      });
    });
    yamlString += "trust_boundaries:\n";
    trustBoundaries.forEach((runtime, index) => {
      yamlString += `  ${runtime.name}:\n`;
      yamlString += `    id: ${runtime.id}\n`;
      yamlString += `    description: ${runtime.description}\n`;
      yamlString += `    type: ${runtime.type}\n`;
      yamlString += `    tags:\n`;
      runtime.tags.forEach((tag) => {
        yamlString += `      - ${tag}\n`; // Add each tag in a nested list
      });
      yamlString += `    technical_assets_running:\n`;
      if (runtime.technical_assets_inside.length === 0) {
        yamlString += `      \n`; // Placeholder for empty array
      } else {
        runtime.technical_assets_inside.forEach((asset) => {
          yamlString += `      - ${asset}\n`;
        });
      }
      yamlString += `    trust_boundaries_nested:\n`;
      if (runtime.trust_boundaries_nested.length === 0) {
        yamlString += `      \n`; // Placeholder for empty array
      } else {
        runtime.trust_boundaries_nested.forEach((boundary) => {
          yamlString += `      - ${boundary}\n`;
        });
      }
    });

    // Convert shared runtimes to YAML
    yamlString += "shared_runtimes:\n";
    sharedRuntimes.forEach((runtime, index) => {
      yamlString += `  ${runtime.name}:\n`;
      yamlString += `      id: ${runtime.id}\n`;
      yamlString += `      description: ${runtime.description}\n`;
      yamlString += `      tags: ${runtime.tags.join(", ")}\n`;
      yamlString += `      technical_assets_running:\n`;
      if (runtime.technical_assets_inside.length === 0) {
        yamlString += `        \n`; // Placeholder for empty array
      } else {
        runtime.technical_assets_inside.forEach((asset) => {
          yamlString += `        - ${asset}\n`;
        });
      }
    });

    // Add other form data from steps 1 to 4 as needed
    const data1 = {
      individual_risk_categories: {
        "Some Individual Risk Example": {
          id: "something-strange",
          description: "Some text describing the risk category...",
          impact: "Some text describing the impact...",
          asvs: "V0 - Something Strange",
          cheat_sheet: "https://example.com",
          action: "Some text describing the action...",
          mitigation: "Some text describing the mitigation...",
          check: "Check if XYZ...",
          function: "business-side",
          stride: "repudiation",
          detection_logic: "Some text describing the detection logic...",
          risk_assessment: "Some text describing the risk assessment...",
          false_positives:
            "Some text describing the most common types of false positives...",
          model_failure_possible_reason: false,
          cwe: 693,
          risks_identified: {
            "<b>Example Individual Risk</b> at <b>Some Technical Asset</b>": {
              severity: "critical",
              exploitation_likelihood: "likely",
              exploitation_impact: "medium",
              data_breach_probability: "probable",
              data_breach_technical_assets: ["some-component"],
              most_relevant_data_asset: "",
              most_relevant_technical_asset: "some-component",
              most_relevant_communication_link: "",
              most_relevant_trust_boundary: "",
              most_relevant_shared_runtime: "",
            },
          },
        },
      },
      risk_tracking: {
        "unencrypted-asset@some-component": {
          status: "accepted",
          justification: "Risk accepted as tolerable",
          ticket: "XYZ-1234",
          date: "2020-01-04",
          checked_by: "John Doe",
        },
      },
    };

    // Convert data to YAML format

    for (const [key, value] of Object.entries(data1)) {
      yamlString += `${key}:\n`;
      if (typeof value === "object") {
        for (const [innerKey, innerValue] of Object.entries(value)) {
          yamlString += `  ${innerKey}:\n`;
          if (typeof innerValue === "object") {
            for (const [subInnerKey, subInnerValue] of Object.entries(
              innerValue
            )) {
              if (Array.isArray(subInnerValue)) {
                yamlString += `    ${subInnerKey}:\n`;
                subInnerValue.forEach((item) => {
                  yamlString += `      - ${item}\n`;
                });
              } else {
                yamlString += `    ${subInnerKey}: ${subInnerValue}\n`;
              }
            }
          } else {
            yamlString += `  ${innerValue}\n`;
          }
        }
      }
    }
    return yamlString;
  };
  const handleBackToDataAssets = () => {
    if (showSharedRuntimesForm) {
      setShowSharedRuntimesForm(false);
      setShowTrustBoundariesForm(true);
    } else if (showTrustBoundariesForm) {
      setShowTrustBoundariesForm(false);
      setShowTechnicalAssetsForm(true);
    } else if (showTechnicalAssetsForm) {
      setShowTechnicalAssetsForm(false);
      setShowDataAssetsForm(true);
    } else if (showYamlOutput) {
      setShowYamlOutput(false);
      setShowSharedRuntimesForm(true);
    } else {
      setNextStep(false); // This should be your existing logic to go back to the data assets form
    }
  };

  const handleAddTechnicalAsset = () => {
    setTechnicalAssets((prevTechnicalAssets) => [
      ...prevTechnicalAssets,
      {
        id:
          prevTechnicalAssets.length > 0
            ? prevTechnicalAssets[prevTechnicalAssets.length - 1].id + 1
            : prevTechnicalAssets.length + 1,
        title: "",
        unique_id: "",
        description: "",
        type: "process",
        usage: "business",
        used_as_client_by_human: false,
        out_of_scope: false,
        justification_out_of_scope: "",
        size: "component",
        technology: "web-service-rest",
        tags: [],
        internet: false,
        machine: "virtual",
        encryption: "none",
        owner: "",
        confidentiality: "public",
        integrity: "archive",
        availability: "archive",
        justification_cia_rating: "",
        multi_tenant: false,
        redundant: false,
        custom_developed_parts: true,
        data_assets_processed: [],
        data_assets_stored: [],
        data_formats_accepted: [],
        communication_links: [
          {
            description: "",
            protocol: "https",
            authentication: "none",
            authorization: "none",
            tags: [],
            vpn: false,
            ip_filtered: false,
            readonly: false,
            usage: "business",
            data_assets_sent: [],
            data_assets_received: [],
          },
        ],
      },
    ]);
  };

  const handleChangeTechnicalAsset = (index, event) => {
    const newTechnicalAssets = [...technicalAssets];
    newTechnicalAssets[index][event.target.name] = event.target.value;
    setTechnicalAssets(newTechnicalAssets);
  };

  const handleSaveAssets = () => {
    const dataAssetsObject = {};
    dataAssets.forEach((asset) => {
      dataAssetsObject[`Data Asset ${asset.id}`] = asset;
    });

    const technicalAssetsObject = {};
    technicalAssets.forEach((asset) => {
      technicalAssetsObject[`Technical Asset ${asset.id}`] = asset;
    });

    console.log(dataAssetsObject); // Replace console.log with your save logic for data assets
    console.log(technicalAssetsObject); // Replace console.log with your save logic for technical assets
  };
  const handleCheckboxChange1 = (e, index) => {
    const checkedAssetId = parseInt(e.target.value);
    const isChecked = e.target.checked;

    setTrustBoundaries((prevBoundaries) => {
      const updatedBoundaries = [...prevBoundaries];
      const selectedAssets = updatedBoundaries[index].technical_assets_inside;

      if (isChecked) {
        selectedAssets.push(checkedAssetId);
      } else {
        const assetIndex = selectedAssets.indexOf(checkedAssetId);
        if (assetIndex !== -1) {
          selectedAssets.splice(assetIndex, 1);
        }
      }

      updatedBoundaries[index].technical_assets_inside = selectedAssets;
      return updatedBoundaries;
    });
  };
  return (
    <div className="container">
      <h1>
        {showSharedRuntimesForm
          ? "Shared Runtimes - Step 4"
          : showTrustBoundariesForm
          ? "Trust Boundaries - Step 3"
          : showTechnicalAssetsForm
          ? "Technical Assets - Step 2"
          : showYamlOutput
          ? "Threat Modeling YAML Mapping"
          : "Data Assets - Step 1"}
      </h1>

      {showTechnicalAssetsForm ? (
        <div>
          {/* Technical Assets Form */}
          {technicalAssets.map((asset, index) => (
            <div key={index} className="card">
              <div className="card-content">
                <h3>{`Technical Asset Information - ID: ${asset.id}`}</h3>
                <form>
                  <div className="form-row">
                    <label>Technical Asset Name:</label>
                    <input
                      type="text"
                      name="title"
                      value={asset.title}
                      onChange={(e) => {
                        const newTitle = e.target.value;
                        const newUniqueId = `${newTitle} - ${asset.id}`;
                        handleChangeTechnicalAsset(index, e);
                        handleChangeTechnicalAsset(index, {
                          ...e,
                          target: {
                            ...e.target,
                            name: "unique_id",
                            value: newUniqueId,
                          },
                        });
                      }}
                      required
                    />
                  </div>
                  <div className="form-row">
                    <label>Description:</label>
                    <textarea
                      name="description"
                      value={asset.description}
                      onChange={(e) => handleChangeTechnicalAsset(index, e)}
                      required
                    />
                  </div>
                  <div className="form-row">
                    <label>Type:</label>
                    <select
                      name="type"
                      value={asset.type}
                      onChange={(e) => handleChangeTechnicalAsset(index, e)}
                      required
                    >
                      <option value="external-entity">External Entity</option>
                      <option value="process">Process</option>
                      <option value="datastore">Datastore</option>
                    </select>
                  </div>
                  <div className="form-row">
                    <label>Usage:</label>
                    <select
                      name="usage"
                      value={asset.usage}
                      onChange={(e) => handleChangeTechnicalAsset(index, e)}
                      required
                    >
                      <option value="business">Business</option>
                      <option value="devops">DevOps</option>
                    </select>
                  </div>
                  <div
                    className="form-row"
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <div className="checkbox-group">
                      <div className="checkbox-item">
                        <label>
                          <input
                            type="checkbox"
                            name="used_as_client_by_human"
                            checked={asset.used_as_client_by_human}
                            onChange={(e) =>
                              handleChangeTechnicalAsset(index, e)
                            }
                          />
                          Used as Client by Human
                        </label>
                      </div>
                      <div className="checkbox-item">
                        <label>
                          <input
                            type="checkbox"
                            name="out_of_scope"
                            checked={asset.out_of_scope}
                            onChange={(e) =>
                              handleChangeTechnicalAsset(index, e)
                            }
                          />
                          Out of Scope
                        </label>
                      </div>
                      <div className="checkbox-item">
                        <label>
                          <input
                            type="checkbox"
                            name="internet"
                            checked={asset.internet}
                            onChange={(e) =>
                              handleChangeTechnicalAsset(index, e)
                            }
                          />
                          Internet
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="form-row">
                    <label>Justification Out of Scope:</label>
                    <textarea
                      name="justification_out_of_scope"
                      value={asset.justification_out_of_scope}
                      onChange={(e) => handleChangeTechnicalAsset(index, e)}
                    />
                  </div>
                  <div className="form-row">
                    <label>Size:</label>
                    <select
                      name="size"
                      value={asset.size}
                      onChange={(e) => handleChangeTechnicalAsset(index, e)}
                      required
                    >
                      <option value="system">System</option>
                      <option value="service">Service</option>
                      <option value="application">Application</option>
                      <option value="component">Component</option>
                    </select>
                  </div>
                  <div className="form-row">
                    <label>Technology:</label>
                    <select
                      name="technology"
                      value={asset.technology}
                      onChange={(e) => handleChangeTechnicalAsset(index, e)}
                      required
                    >
                      <option value="web-service-rest">Web Service REST</option>
                      {/* Add other technology options */}
                    </select>
                  </div>
                  <div className="form-row">
                    <label>Tags:</label>
                    <input
                      type="text"
                      name="tags"
                      value={asset.tags.join(", ")}
                      onChange={(e) =>
                        handleChangeTechnicalAsset(index, {
                          target: {
                            name: "tags",
                            value: e.target.value.split(", "),
                          },
                        })
                      }
                    />
                  </div>

                  <div className="form-row">
                    <label>Machine:</label>
                    <select
                      name="machine"
                      value={asset.machine}
                      onChange={(e) => handleChangeTechnicalAsset(index, e)}
                      required
                    >
                      <option value="physical">Physical</option>
                      <option value="virtual">Virtual</option>
                      <option value="container">Container</option>
                      <option value="serverless">Serverless</option>
                    </select>
                  </div>
                  <div className="form-row">
                    <label>Encryption:</label>
                    <select
                      name="encryption"
                      value={asset.encryption}
                      onChange={(e) => handleChangeTechnicalAsset(index, e)}
                      required
                    >
                      <option value="none">None</option>
                      <option value="transparent">Transparent</option>
                      <option value="data-with-symmetric-shared-key">
                        Data with Symmetric Shared Key
                      </option>
                      <option value="data-with-asymmetric-shared-key">
                        Data with Asymmetric Shared Key
                      </option>
                      <option value="data-with-enduser-individual-key">
                        Data with Enduser Individual Key
                      </option>
                    </select>
                  </div>
                  <div className="form-row">
                    <label>Owner:</label>
                    <input
                      type="text"
                      name="owner"
                      value={asset.owner}
                      onChange={(e) => handleChangeTechnicalAsset(index, e)}
                      required
                    />
                  </div>
                  <div className="form-row">
                    <label>Confidentiality:</label>
                    <select
                      name="confidentiality"
                      value={asset.confidentiality}
                      onChange={(e) => handleChangeTechnicalAsset(index, e)}
                      required
                    >
                      <option value="public">Public</option>
                      <option value="internal">Internal</option>
                      <option value="restricted">Restricted</option>
                      <option value="confidential">Confidential</option>
                      <option value="strictly-confidential">
                        Strictly Confidential
                      </option>
                    </select>
                  </div>
                  <div className="form-row">
                    <label>Integrity:</label>
                    <select
                      name="integrity"
                      value={asset.integrity}
                      onChange={(e) => handleChangeTechnicalAsset(index, e)}
                      required
                    >
                      <option value="archive">Archive</option>
                      <option value="operational">Operational</option>
                      <option value="important">Important</option>
                      <option value="critical">Critical</option>
                      <option value="mission-critical">Mission-Critical</option>
                    </select>
                  </div>
                  <div className="form-row">
                    <label>Availability:</label>
                    <select
                      name="availability"
                      value={asset.availability}
                      onChange={(e) => handleChangeTechnicalAsset(index, e)}
                      required
                    >
                      <option value="archive">Archive</option>
                      <option value="operational">Operational</option>
                      <option value="important">Important</option>
                      <option value="critical">Critical</option>
                      <option value="mission-critical">Mission-Critical</option>
                    </select>
                  </div>
                  <div className="form-row">
                    <label>Justification (CIA Rating):</label>
                    <textarea
                      name="justification_cia_rating"
                      value={asset.justification_cia_rating}
                      onChange={(e) => handleChangeTechnicalAsset(index, e)}
                    />
                  </div>
                  <div
                    className="form-row"
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <div className="checkbox-group">
                      <div className="checkbox-item">
                        <label>
                          <input
                            type="checkbox"
                            name="multi_tenant"
                            checked={asset.multi_tenant}
                            onChange={(e) =>
                              handleChangeTechnicalAsset(index, e)
                            }
                          />
                          Multi-tenant
                        </label>
                      </div>
                      <div className="checkbox-item">
                        <label>
                          <input
                            type="checkbox"
                            name="redundant"
                            checked={asset.redundant}
                            onChange={(e) =>
                              handleChangeTechnicalAsset(index, e)
                            }
                          />
                          Redundant
                        </label>
                      </div>
                      <div className="checkbox-item">
                        <label>
                          <input
                            type="checkbox"
                            name="custom_developed_parts"
                            checked={asset.custom_developed_parts}
                            onChange={(e) =>
                              handleChangeTechnicalAsset(index, e)
                            }
                          />
                          Custom Developed Parts
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="form-row">
                    <label>Data Assets Processed:</label>
                    <select
                      multiple
                      name="data_assets_processed"
                      value={asset.data_assets_processed}
                      onChange={(e) => handleChangeTechnicalAsset(index, e)}
                      required
                    >
                      {dataAssets.map((dataAsset) => (
                        <option key={dataAsset.id} value={dataAsset.id}>
                          {dataAsset.unique_id}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-row">
                    <label>Data Assets Stored:</label>
                    <select
                      name="data_assets_stored"
                      value={asset.data_assets_stored}
                      onChange={(e) => handleChangeTechnicalAsset(index, e)}
                      required
                    >
                      {dataAssets.map((dataAsset) => (
                        <option key={dataAsset.id} value={dataAsset.id}>
                          {dataAsset.unique_id}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-row">
                    <label>Data Formats Accepted:</label>
                    <select
                      name="data_formats_accepted"
                      value={asset.data_formats_accepted}
                      onChange={(e) => handleChangeTechnicalAsset(index, e)}
                      required
                    >
                      <option value="">Select Format</option>
                      <option value="json">JSON</option>
                      <option value="xml">XML</option>
                      <option value="serialization">Serialization</option>
                      <option value="file">File</option>
                      <option value="csv">CSV</option>
                      {/* Add other format options */}
                    </select>
                  </div>
                  <div className="form-row">
                    <label>Communication Links:</label>
                    {asset.communication_links.map((link, linkIndex) => (
                      <div key={linkIndex} className="communication-link">
                        <h4>{link.name}</h4>
                        <div className="form-row">
                          <label>Description:</label>
                          <textarea
                            name={`communication_links[${index}].description`}
                            value={link.description}
                            onChange={(e) =>
                              handleChangeTechnicalAsset(index, e)
                            }
                          />
                        </div>
                        {/* Add other fields for communication links */}
                      </div>
                    ))}
                  </div>
                </form>
                {index > 0 && (
                  <button
                    type="button"
                    className="remove-btn"
                    onClick={() => handleRemoveTechnicalAsset(index)}
                  >
                    X
                  </button>
                )}
              </div>
            </div>
          ))}

          <div className="form-actions">
            <button
              type="button"
              className="add-more-btn"
              onClick={handleAddTechnicalAsset}
            >
              + Add More
            </button>
            <button
              type="button"
              className="next-btn"
              onClick={handleBackToDataAssets}
            >
              Back
            </button>
            <button
              type="button"
              className="next-btn"
              onClick={() => {
                setShowTechnicalAssetsForm(false);
                handleNextStep();
              }}
            >
              Next
            </button>
          </div>
        </div>
      ) : showTrustBoundariesForm ? (
        <div>
          {/* Trust Boundaries Form */}
          {trustBoundaries.map((boundary, index) => (
            <div key={index} className="card">
              <div className="card-content">
                <h3>{`Trust Boundary Information - ID: ${boundary.id}`}</h3>
                <form>
                  <div className="form-row">
                    <label>Description:</label>
                    <textarea
                      name="description"
                      value={boundary.description}
                      onChange={(e) => handleChangeTrustBoundary(index, e)}
                      required
                    />
                  </div>
                  <div className="form-row">
                    <label>Type:</label>
                    <select
                      name="type"
                      value={boundary.type}
                      onChange={(e) => handleChangeTrustBoundary(index, e)}
                      required
                    >
                      <option value="network-dedicated-hoster">
                        Network Dedicated Hoster
                      </option>
                      {/* Add other options for trust boundary types */}
                    </select>
                  </div>
                  <div className="form-row">
                    <label>Tags:</label>
                    <input
                      type="text"
                      name="tags"
                      value={boundary.tags.join(", ")}
                      onChange={(e) =>
                        handleChangeTrustBoundary(index, {
                          target: {
                            name: "tags",
                            value: e.target.value.split(", "),
                          },
                        })
                      }
                    />
                  </div>
                  <div className="form-row">
                    <label>Technical Assets Inside:</label>
                    <select
                      multiple
                      className="form-control"
                      value={boundary.technical_assets_inside} // Use an array here
                      onChange={(e) =>
                        handleCheckboxChange(index, e.target.value)
                      }
                    >
                      {technicalAssets.map((asset) => (
                        <option key={asset.id} value={asset.id}>
                          {asset.unique_id}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-row">
                    <label>Trust Boundaries Nested:</label>
                    <select
                      name="trust_boundaries_nested"
                      value={boundary.trust_boundaries_nested}
                      onChange={(e) => handleChangeTrustBoundary(index, e)}
                      required
                    >
                      {/* Populate options from trust boundaries */}
                      {trustBoundaries.map((boundary) => (
                        <option key={boundary.id} value={boundary.id}>
                          {boundary.description}
                        </option>
                      ))}
                    </select>
                  </div>
                </form>
                {index > 0 && (
                  <button
                    type="button"
                    className="remove-btn"
                    onClick={() => handleRemoveTrustBoundary(index)}
                  >
                    X
                  </button>
                )}
              </div>
            </div>
          ))}

          <div className="form-actions">
            <button
              type="button"
              className="add-more-btn"
              onClick={handleAddTrustBoundary}
            >
              + Add More
            </button>
            <button
              type="button"
              className="next-btn"
              onClick={handleBackToDataAssets}
            >
              Back
            </button>
            <button
              type="button"
              className="next-btn"
              onClick={() => {
                setShowTrustBoundariesForm(false);
                handleNextStep();
              }}
            >
              Next
            </button>
          </div>
        </div>
      ) : showSharedRuntimesForm ? (
        <div>
          {/* Shared Runtimes Form */}
          {/* Add your shared runtimes form JSX here */}
          {sharedRuntimes.map((boundary, index) => (
            <div key={index} className="card">
              <div className="card-content">
                <h3>{`Shared Runtime Information - ID: ${boundary.id}`}</h3>
                <form>
                  <div className="form-row">
                    <label>Name:</label>
                    <input
                      type="text"
                      name="name"
                      value={boundary.name}
                      onChange={(e) => handleChangeSharedRuntime(index, e)}
                      required
                    />
                  </div>
                  <div className="form-row">
                    <label>Description:</label>
                    <textarea
                      name="description"
                      value={boundary.description}
                      onChange={(e) => handleChangeSharedRuntime(index, e)}
                      required
                    />
                  </div>
                  <div className="form-row">
                    <label>Tags:</label>
                    <input
                      type="text"
                      name="tags"
                      value={boundary.tags.join(", ")}
                      onChange={(e) =>
                        handleChangeSharedRuntime(index, {
                          target: {
                            name: "tags",
                            value: e.target.value.split(", "),
                          },
                        })
                      }
                    />
                  </div>
                  <div className="form-row">
                    <label>Technical Assets Running:</label>
                    <select
                      multiple
                      className="form-control"
                      value={boundary.technical_assets_inside} // Use an array here
                      onChange={(e) =>
                        handleSharedRunTimeCheckboxChange(index, e.target.value)
                      }
                    >
                      {technicalAssets.map((asset) => (
                        <option key={asset.unique_id} value={asset.unique_id}>
                          {asset.unique_id}
                        </option>
                      ))}
                    </select>
                  </div>
                </form>
                {index > 0 && (
                  <button
                    type="button"
                    className="remove-btn"
                    onClick={() => handleRemoveSharedRunTime(index)}
                  >
                    X
                  </button>
                )}
              </div>
            </div>
          ))}
          <div className="form-actions">
            <button
              type="button"
              className="add-more-btn"
              onClick={handleAddSharedRuntime}
            >
              + Add More
            </button>
            <button
              type="button"
              className="next-btn"
              onClick={handleBackToDataAssets}
            >
              Back
            </button>
            <button
              type="button"
              className="next-btn"
              onClick={() => {
                setShowSharedRuntimesForm(false);
                handleNextStep();
                handleSave();
              }}
            >
              Save
            </button>
          </div>
        </div>
      ) : showYamlOutput ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Display the YAML output here */}
          <textarea
            id="yamlOutput"
            value={yamlOutput}
            ref={textAreaRef}
            readOnly
            rows={15} // Increased the number of rows
            cols={50}
            style={{
              width: "100%", // Adjusted width to 80% of the container
              textAlign: "left",
              fontFamily: "monospace",
              whiteSpace: "pre-wrap",
              resize: "none",
              marginBottom: "20px", // Added margin below the textarea

              resize: "none", // Disable resize by user
              height: "70vh",
            }}
          />
          <div style={{ display: "flex", alignItems: "center" }}>
            <button
              type="button"
              className="next-btn"
              onClick={() => {
                handleBackToDataAssets();
              }}
              style={{
                padding: "8px 16px",
                fontSize: "14px",
                fontWeight: "bold",
                backgroundColor: "transparent",
                color: "#343a40",
                border: "2px solid #343a40",
                borderRadius: "5px",
                cursor: "pointer",
                transition:
                  "background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease",
                marginRight: "8px",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#343a40";
                e.target.style.color = "#fff"; /* White color on hover */
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "transparent";
                e.target.style.color = "#343a40"; /* Dark color on leave */
              }}
            >
              Back
            </button>
            <button
              onClick={handleCopyToClipboard}
              style={{
                padding: "8px 16px",
                fontSize: "14px",
                fontWeight: "bold",
                backgroundColor: "#eaeaea",
                color: "#343a40",
                border: "1px solid #ccc",
                borderRadius: "3px",
                cursor: "pointer",
                transition:
                  "background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease",
                marginRight: "8px",
              }}
            >
              Copy to Clipboard
            </button>
          </div>
        </div>
      ) : (
        <div>
          {/* Data Assets Form */}
          {dataAssets.map((asset, index) => (
            <div key={index} className="card">
              <div className="card-content">
                <h3>{`Data Asset Information - ID: ${asset.id}`}</h3>
                <form>
                  <div className="form-row">
                    <label>Data Asset Name:</label>
                    <input
                      type="text"
                      name="data_asset_title"
                      value={asset.data_asset_title}
                      onChange={(e) => {
                        const newTitle = e.target.value;
                        const newUniqueId = `${newTitle} - ${asset.id}`;
                        handleChangeDataAsset(index, e);
                        handleChangeDataAsset(index, {
                          ...e,
                          target: {
                            ...e.target,
                            name: "unique_id",
                            value: newUniqueId,
                          },
                        });
                      }}
                      required
                    />
                  </div>
                  <div className="form-row">
                    <label>Description:</label>
                    <textarea
                      name="description"
                      value={asset.description}
                      onChange={(e) => handleChangeDataAsset(index, e)}
                      required
                    />
                  </div>
                  <div className="form-row">
                    <label>Usage:</label>
                    <select
                      name="usage"
                      value={asset.usage}
                      onChange={(e) => handleChange(index, e)}
                      required
                    >
                      <option value="business">Business</option>
                      <option value="devops">DevOps</option>
                    </select>
                  </div>
                  <div className="form-row">
                    <label>Tags:</label>
                    <input
                      type="text"
                      name="tags"
                      value={asset.tags.join(", ")}
                      onChange={(e) =>
                        handleChange(index, {
                          target: {
                            name: "tags",
                            value: e.target.value.split(", "),
                          },
                        })
                      }
                    />
                  </div>
                  <div className="form-row">
                    <label>Origin:</label>
                    <input
                      type="text"
                      name="origin"
                      value={asset.origin}
                      onChange={(e) => handleChange(index, e)}
                      required
                    />
                  </div>
                  <div className="form-row">
                    <label>Owner:</label>
                    <input
                      type="text"
                      name="owner"
                      value={asset.owner}
                      onChange={(e) => handleChange(index, e)}
                      required
                    />
                  </div>
                  <div className="form-row">
                    <label>Quantity:</label>
                    <select
                      name="quantity"
                      value={asset.quantity}
                      onChange={(e) => handleChange(index, e)}
                      required
                    >
                      <option value="very-few">Very Few</option>
                      <option value="few">Few</option>
                      <option value="many">Many</option>
                      <option value="very-many">Very Many</option>
                    </select>
                  </div>
                  <div className="form-row">
                    <label>Confidentiality:</label>
                    <select
                      name="confidentiality"
                      value={asset.confidentiality}
                      onChange={(e) => handleChange(index, e)}
                      required
                    >
                      <option value="public">Public</option>
                      <option value="internal">Internal</option>
                      <option value="restricted">Restricted</option>
                      <option value="confidential">Confidential</option>
                      <option value="strictly-confidential">
                        Strictly Confidential
                      </option>
                    </select>
                  </div>
                  <div className="form-row">
                    <label>Integrity:</label>
                    <select
                      name="integrity"
                      value={asset.integrity}
                      onChange={(e) => handleChange(index, e)}
                      required
                    >
                      <option value="archive">Archive</option>
                      <option value="operational">Operational</option>
                      <option value="important">Important</option>
                      <option value="critical">Critical</option>
                      <option value="mission-critical">Mission-Critical</option>
                    </select>
                  </div>
                  <div className="form-row">
                    <label>Availability:</label>
                    <select
                      name="availability"
                      value={asset.availability}
                      onChange={(e) => handleChange(index, e)}
                      required
                    >
                      <option value="archive">Archive</option>
                      <option value="operational">Operational</option>
                      <option value="important">Important</option>
                      <option value="critical">Critical</option>
                      <option value="mission-critical">Mission-Critical</option>
                    </select>
                  </div>
                  <div className="form-row">
                    <label>Justification (CIA Rating):</label>
                    <textarea
                      name="justificationCia"
                      value={asset.justificationCia}
                      onChange={(e) => handleChange(index, e)}
                      required
                    />
                  </div>
                </form>
                {index > 0 && (
                  <button
                    type="button"
                    className="remove-btn"
                    onClick={() => handleRemoveDataAssets(index)}
                  >
                    X
                  </button>
                )}
              </div>
            </div>
          ))}

          <div className="form-actions">
            <button
              type="button"
              className="add-more-btn"
              onClick={handleAddDataAsset}
            >
              + Add More
            </button>
            <button
              type="button"
              className="next-btn"
              onClick={() => {
                setShowDataAssetsForm(false);
                handleNextStep();
              }}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataAssetsForm;
