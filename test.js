// DataAssetsForm.js
import React, { useState } from "react";
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
      description: "",
      usage: "business",
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
        description: "",
        usage: "business",
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

    // Convert shared runtimes to YAML
    yamlString += "Shared Runtimes:\n";
    sharedRuntimes.forEach((runtime, index) => {
      yamlString += `  ${runtime.name}:\n`;
      yamlString += `      id: ${runtime.id}\n`;
      yamlString += `      description: ${runtime.description}\n`;
      yamlString += `      tags: ${runtime.tags.join(", ")}\n`;
      yamlString += `      technical_assets_running:\n`;
      if (runtime.technical_assets_running.length === 0) {
        yamlString += `        []\n`; // Placeholder for empty array
      } else {
        runtime.technical_assets_running.forEach((asset) => {
          yamlString += `        - ${asset}\n`;
        });
      }
    });

    // Convert trust boundaries to YAML
    yamlString += "\nTrust Boundaries:\n";
    formData.trustBoundaries.forEach((boundary, index) => {
      yamlString += `  - ID: ${boundary.id}\n`;
      yamlString += `    Description: ${boundary.description}\n`;
      // Add other fields as needed
    });

    // Add other form data from steps 1 to 4 as needed

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
                  <div className="form-row">
                    <label>Used as Client by Human:</label>
                    <input
                      type="checkbox"
                      name="used_as_client_by_human"
                      checked={asset.used_as_client_by_human}
                      onChange={(e) => handleChangeTechnicalAsset(index, e)}
                    />
                  </div>
                  <div className="form-row">
                    <label>Out of Scope:</label>
                    <input
                      type="checkbox"
                      name="out_of_scope"
                      checked={asset.out_of_scope}
                      onChange={(e) => handleChangeTechnicalAsset(index, e)}
                    />
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
                    <label>Internet:</label>
                    <input
                      type="checkbox"
                      name="internet"
                      checked={asset.internet}
                      onChange={(e) => handleChangeTechnicalAsset(index, e)}
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
                  <div className="form-row">
                    <label>Multi-tenant:</label>
                    <input
                      type="checkbox"
                      name="multi_tenant"
                      checked={asset.multi_tenant}
                      onChange={(e) => handleChangeTechnicalAsset(index, e)}
                    />
                  </div>
                  <div className="form-row">
                    <label>Redundant:</label>
                    <input
                      type="checkbox"
                      name="redundant"
                      checked={asset.redundant}
                      onChange={(e) => handleChangeTechnicalAsset(index, e)}
                    />
                  </div>
                  <div className="form-row">
                    <label>Custom Developed Parts:</label>
                    <input
                      type="checkbox"
                      name="custom_developed_parts"
                      checked={asset.custom_developed_parts}
                      onChange={(e) => handleChangeTechnicalAsset(index, e)}
                    />
                  </div>
                  <div className="form-row">
                    <label>Data Assets Processed:</label>
                    <select
                      name="data_assets_processed"
                      value={asset.data_assets_processed}
                      onChange={(e) => handleChangeTechnicalAsset(index, e)}
                      required
                    >
                      <option value="">Select Data Asset</option>
                      {dataAssets.map((dataAsset) => (
                        <option key={dataAsset.id} value={dataAsset.id}>
                          {dataAsset.description}
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
                      <option value="">Select Data Asset</option>
                      {dataAssets.map((dataAsset) => (
                        <option key={dataAsset.id} value={dataAsset.id}>
                          {dataAsset.description}
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
                          {asset.description}
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
                        <option key={asset.id} value={asset.id}>
                          {asset.description}
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
        <div>
          {/* Display the YAML output here */}
          <pre>{yamlOutput}</pre>
          <button
            type="button"
            className="next-btn"
            onClick={() => {
              handleBackToDataAssets();
            }}
          >
            Back to Form
          </button>
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
