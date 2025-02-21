import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from "react";
import ReactDOM from "react-dom/client";

function App() {
    const [crop, setCrop] = useState("");
    const [landArea, setLandArea] = useState("");
    const [budget, setBudget] = useState("");
    const [pesticides, setPesticides] = useState([]);

    // Expanded pesticide data with dosage per acre and cost per unit (kg/L)
    const pesticideData = {
        wheat: [
            { name: "Chlorpyrifos", dosage: 2, costPerUnit: 500 },
            { name: "Malathion", dosage: 1.5, costPerUnit: 450 },
            { name: "Deltamethrin", dosage: 1, costPerUnit: 600 }
        ],
        rice: [
            { name: "Carbaryl", dosage: 2.5, costPerUnit: 400 },
            { name: "Fipronil", dosage: 1.8, costPerUnit: 750 },
            { name: "Buprofezin", dosage: 1.2, costPerUnit: 550 }
        ],
        maize: [
            { name: "Imidacloprid", dosage: 1.5, costPerUnit: 700 },
            { name: "Thiamethoxam", dosage: 1.2, costPerUnit: 620 },
            { name: "Lambda-Cyhalothrin", dosage: 1.8, costPerUnit: 500 }
        ],
        potato: [
            { name: "Mancozeb", dosage: 2.2, costPerUnit: 450 },
            { name: "Metalaxyl", dosage: 1.5, costPerUnit: 800 },
            { name: "Propamocarb", dosage: 1.8, costPerUnit: 650 }
        ],
        cotton: [
            { name: "Acephate", dosage: 2.3, costPerUnit: 550 },
            { name: "Cypermethrin", dosage: 1.5, costPerUnit: 480 },
            { name: "Thiodicarb", dosage: 1.8, costPerUnit: 600 }
        ],
        sugarcane: [
            { name: "Chlorantraniliprole", dosage: 2, costPerUnit: 750 },
            { name: "Flubendiamide", dosage: 1.4, costPerUnit: 670 },
            { name: "Tebuconazole", dosage: 1.6, costPerUnit: 580 }
        ],
        soybeans: [
            { name: "Lambda-Cyhalothrin", dosage: 2.1, costPerUnit: 520 },
            { name: "Dimethoate", dosage: 1.3, costPerUnit: 490 },
            { name: "Pyriproxyfen", dosage: 1.7, costPerUnit: 650 }
        ],
        tomato: [
            { name: "Spinosad", dosage: 2.2, costPerUnit: 700 },
            { name: "Abamectin", dosage: 1.5, costPerUnit: 620 },
            { name: "Difenoconazole", dosage: 1.8, costPerUnit: 590 }
        ]
    };

    const crops = Object.keys(pesticideData);

    const handleSearch = () => {
        if (!crop) {
            alert("Please select a crop.");
            return;
        }

        if (!landArea || isNaN(landArea) || landArea <= 0) {
            alert("Please enter a valid land area.");
            return;
        }

        if (budget && (isNaN(budget) || budget <= 0)) {
            alert("Please enter a valid budget.");
            return;
        }

        const selectedPesticides = pesticideData[crop] || [];
        let pesticideList = selectedPesticides.map(pesticide => {
            let totalDosage = (pesticide.dosage * parseFloat(landArea)).toFixed(2);
            let totalCost = (totalDosage * pesticide.costPerUnit).toFixed(2);
            return { ...pesticide, totalDosage, totalCost };
        });

        if (budget) {
            pesticideList = pesticideList.filter(p => parseFloat(p.totalCost) <= parseFloat(budget));
        }

        setPesticides(pesticideList.length > 0 ? pesticideList : ["No pesticides within budget."]);
    };

    return (
        <div style={{ textAlign: "center", padding: "20px", fontFamily: "Arial" }}>
            <h1>Welcome to Agriculture App 🌱</h1>
            <p>Select your crop and enter details to find the best pesticide options:</p>
            <select onChange={(e) => setCrop(e.target.value)} value={crop} style={{ padding: "8px", marginRight: "10px" }}>
                <option value="">-- Select Crop --</option>
                {crops.map(cropName => (
                    <option key={cropName} value={cropName}>{cropName.charAt(0).toUpperCase() + cropName.slice(1)}</option>
                ))}
            </select>
            <input type="number" placeholder="Enter land area (in acres)" value={landArea} onChange={(e) => setLandArea(e.target.value)} style={{ padding: "8px", marginRight: "10px" }} />
            <input type="number" placeholder="Enter budget (optional)" value={budget} onChange={(e) => setBudget(e.target.value)} style={{ padding: "8px", marginRight: "10px" }} />
            <button onClick={handleSearch} style={{ padding: "8px 15px", cursor: "pointer" }}>Search</button>
            <div style={{ marginTop: "20px" }}>
                <h3>Recommended Pesticides:</h3>
                <ul>
                    {pesticides.length > 0 ? (
                        pesticides.map((pesticide, index) =>
                            typeof pesticide === "string" ? (
                                <li key={index}>{pesticide}</li>
                            ) : (
                                <li key={index}><strong>{pesticide.name}</strong> - {pesticide.totalDosage} kg/L - ₹{pesticide.totalCost}</li>
                            )
                        )
                    ) : (
                        <p>No results yet.</p>
                    )}
                </ul>
            </div>
        </div>
    );
}

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
