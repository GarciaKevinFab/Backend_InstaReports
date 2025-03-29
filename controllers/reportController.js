import Report from '../models/Report.js';

// Crear un reporte
export const createReport = async (req, res) => {
<<<<<<< HEAD
    const {
        clientName,
        clientAddress,
        clientPhone,
        clientDNI,
        equipment,
        faultDescription,
        observations,
        maintenanceType,
        status,
        agreedPrice,
        comments,
        receptionDate,
        deliveryDate,
        partsRequested,
        partsDetails,
    } = req.body;

    try {
        const filePath = req.file ? req.file.path : null;

=======
    console.log("🚀 Datos recibidos en createReport:", req.body, req.file);

    const {
        clientName,
        clientAddress,
        clientPhone,
        clientDNI,
        equipment,
        faultDescription,
        observations,
        maintenanceType,
        status,
        agreedPrice,
        comments,
        receptionDate,
        deliveryDate,
        partsRequested,
        partsDetails,
        partsOrdered,
        readyForPickup,
    } = req.body;

    try {
        // Validar datos requeridos
        if (!clientName) {
            return res.status(400).json({ message: "Client name is required" });
        }
        if (!clientAddress) {
            return res.status(400).json({ message: "Client address is required" });
        }
        if (!clientPhone) {
            return res.status(400).json({ message: "Client phone is required" });
        }
        if (!clientDNI) {
            return res.status(400).json({ message: "Client DNI is required" });
        }
        if (!equipment || !equipment.type || !equipment.brand || !equipment.model) {
            return res.status(400).json({ message: "Equipment type, brand, and model are required" });
        }
        if (!faultDescription) {
            return res.status(400).json({ message: "Fault description is required" });
        }
        if (!receptionDate) {
            return res.status(400).json({ message: "Reception date is required" });
        }
        if (!deliveryDate) {
            return res.status(400).json({ message: "Delivery date is required" });
        }
        if (!agreedPrice || isNaN(agreedPrice) || parseFloat(agreedPrice) <= 0) {
            return res.status(400).json({ message: "Agreed price must be a valid positive number" });
        }

        const filePath = req.file ? req.file.path : null;

        // Convertir campos booleanos si son strings
        const partsRequestedBool = partsRequested === 'true' || partsRequested === true;
        const partsOrderedBool = partsOrdered === 'true' || partsOrdered === true;
        const readyForPickupBool = readyForPickup === 'true' || readyForPickup === true;

>>>>>>> e254d02 (Falta estilos y mejora pdf)
        const report = new Report({
            clientName,
            clientAddress,
            clientPhone,
            clientDNI,
<<<<<<< HEAD
            equipment,
            faultDescription,
            observations,
            maintenanceType,
            status,
            agreedPrice,
            comments,
            receptionDate,
            deliveryDate,
            partsRequested,
            partsDetails,
=======
            equipment: {
                type: equipment.type || '',
                brand: equipment.brand || '',
                model: equipment.model || '',
                serial: equipment.serial || '',
                patrimonialCode: equipment.patrimonialCode || '',
            },
            faultDescription,
            observations: observations || '',
            maintenanceType: maintenanceType || 'Corrective',
            status: status || 'Operative',
            agreedPrice: parseFloat(agreedPrice),
            comments: comments || '',
            receptionDate: new Date(receptionDate),
            deliveryDate: new Date(deliveryDate),
            partsRequested: partsRequestedBool,
            partsDetails: partsDetails || '',
            partsOrdered: partsOrderedBool,
            readyForPickup: readyForPickupBool,
>>>>>>> e254d02 (Falta estilos y mejora pdf)
            files: filePath,
            user: req.user._id,
        });

<<<<<<< HEAD
        const createdReport = await report.save();
        res.status(201).json(createdReport);
    } catch (error) {
=======
        console.log("🚀 Reporte a guardar:", report);

        const createdReport = await report.save();
        console.log("🚀 Reporte creado exitosamente:", createdReport);
        res.status(201).json(createdReport);
    } catch (error) {
        console.error("Error al crear el reporte:", error);
>>>>>>> e254d02 (Falta estilos y mejora pdf)
        res.status(500).json({ message: "Error creating report", error: error.message });
    }
};

// Obtener todos los reportes
export const getReports = async (req, res) => {
    try {
<<<<<<< HEAD
        const reports = await Report.find({}).populate('user', 'name email'); // Muestra info del técnico
        res.json(reports);
    } catch (error) {
=======
        const reports = await Report.find({}).populate('user', 'name email');
        console.log("🚀 Reportes obtenidos:", reports);
        res.json(reports);
    } catch (error) {
        console.error("Error al obtener los reportes:", error);
>>>>>>> e254d02 (Falta estilos y mejora pdf)
        res.status(500).json({ message: 'Error fetching reports', error: error.message });
    }
};

// Actualizar un reporte
export const updateReport = async (req, res) => {
<<<<<<< HEAD
    try {
        const report = await Report.findById(req.params.id);

=======
    console.log("🚀 Datos recibidos en updateReport:", req.body, req.file);

    try {
        const report = await Report.findById(req.params.id);

>>>>>>> e254d02 (Falta estilos y mejora pdf)
        if (!report) {
            return res.status(404).json({ message: "Report not found" });
        }

<<<<<<< HEAD
        // Verificar si hay un archivo nuevo y actualizarlo
        const filePath = req.file ? req.file.path : report.files;

        // Convertir valores de "true" o "false" que llegan como strings desde el frontend
        const booleanFields = ['partsRequested', 'partsOrdered', 'readyForPickup'];
        booleanFields.forEach(field => {
            if (req.body[field] !== undefined) {
                req.body[field] = req.body[field] === 'true';
            }
        });

        // Aplicar los cambios al reporte
        Object.assign(report, req.body, {
            files: filePath, // Actualizar solo si hay un archivo nuevo
=======
        const filePath = req.file ? req.file.path : report.files;

        // Validar datos requeridos
        if (req.body.clientName && !req.body.clientName) {
            return res.status(400).json({ message: "Client name is required" });
        }
        if (req.body.clientAddress && !req.body.clientAddress) {
            return res.status(400).json({ message: "Client address is required" });
        }
        if (req.body.clientPhone && !req.body.clientPhone) {
            return res.status(400).json({ message: "Client phone is required" });
        }
        if (req.body.clientDNI && !req.body.clientDNI) {
            return res.status(400).json({ message: "Client DNI is required" });
        }
        if (req.body.equipment) {
            if (!req.body.equipment.type || !req.body.equipment.brand || !req.body.equipment.model) {
                return res.status(400).json({ message: "Equipment type, brand, and model are required" });
            }
        }
        if (req.body.faultDescription && !req.body.faultDescription) {
            return res.status(400).json({ message: "Fault description is required" });
        }
        if (req.body.receptionDate && !req.body.receptionDate) {
            return res.status(400).json({ message: "Reception date is required" });
        }
        if (req.body.deliveryDate && !req.body.deliveryDate) {
            return res.status(400).json({ message: "Delivery date is required" });
        }
        if (req.body.agreedPrice && (isNaN(req.body.agreedPrice) || parseFloat(req.body.agreedPrice) <= 0)) {
            return res.status(400).json({ message: "Agreed price must be a valid positive number" });
        }

        // Convertir campos booleanos si son strings
        const booleanFields = ['partsRequested', 'partsOrdered', 'readyForPickup'];
        booleanFields.forEach(field => {
            if (req.body[field] !== undefined) {
                req.body[field] = req.body[field] === 'true' || req.body[field] === true;
            }
        });

        // Convertir equipment si está presente
        if (req.body.equipment) {
            req.body.equipment = {
                type: req.body.equipment.type || report.equipment.type,
                brand: req.body.equipment.brand || report.equipment.brand,
                model: req.body.equipment.model || report.equipment.model,
                serial: req.body.equipment.serial || report.equipment.serial,
                patrimonialCode: req.body.equipment.patrimonialCode || report.equipment.patrimonialCode,
            };
        }

        // Convertir agreedPrice a número si existe
        if (req.body.agreedPrice) {
            req.body.agreedPrice = parseFloat(req.body.agreedPrice);
        }

        // Convertir fechas si existen
        if (req.body.receptionDate) {
            req.body.receptionDate = new Date(req.body.receptionDate);
        }
        if (req.body.deliveryDate) {
            req.body.deliveryDate = new Date(req.body.deliveryDate);
        }

        console.log("🚀 Datos a actualizar:", req.body);

        Object.assign(report, req.body, {
            files: filePath,
>>>>>>> e254d02 (Falta estilos y mejora pdf)
        });

        const updatedReport = await report.save();
        console.log("🚀 Reporte actualizado exitosamente:", updatedReport);
        res.json(updatedReport);
    } catch (error) {
<<<<<<< HEAD
        console.error("Error updating report:", error);
=======
        console.error("Error al actualizar el reporte:", error);
>>>>>>> e254d02 (Falta estilos y mejora pdf)
        res.status(500).json({ message: "Error updating report", error: error.message });
    }
};

// Eliminar un reporte
export const deleteReport = async (req, res) => {
    try {
        const report = await Report.findByIdAndDelete(req.params.id);

        if (report) {
<<<<<<< HEAD
=======
            console.log("🚀 Reporte eliminado:", report);
>>>>>>> e254d02 (Falta estilos y mejora pdf)
            res.json({ message: 'Report removed' });
        } else {
            res.status(404).json({ message: 'Report not found' });
        }
    } catch (error) {
<<<<<<< HEAD
        res.status(500).json({ message: 'Error deleting report', error: error.message });
    }
};
=======
        console.error("Error al eliminar el reporte:", error);
        res.status(500).json({ message: 'Error deleting report', error: error.message });
    }
};
>>>>>>> e254d02 (Falta estilos y mejora pdf)
