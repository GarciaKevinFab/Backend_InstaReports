import Report from '../models/Report.js';

// Crear un reporte
export const createReport = async (req, res) => {
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
            return res.status(400).json({ message: "El nombre del cliente es obligatorio" });
        }
        if (!clientAddress) {
            return res.status(400).json({ message: "La dirección del cliente es obligatoria" });
        }
        if (!clientPhone) {
            return res.status(400).json({ message: "El teléfono del cliente es obligatorio" });
        }
        if (!clientDNI) {
            return res.status(400).json({ message: "El DNI del cliente es obligatorio" });
        }
        if (!equipment || !equipment.type || !equipment.brand || !equipment.model) {
            return res.status(400).json({ message: "El tipo, marca y modelo del equipo son obligatorios" });
        }
        if (!faultDescription) {
            return res.status(400).json({ message: "La descripción de la falla es obligatoria" });
        }
        if (!receptionDate) {
            return res.status(400).json({ message: "La fecha de recepción es obligatoria" });
        }
        if (!deliveryDate) {
            return res.status(400).json({ message: "La fecha de entrega es obligatoria" });
        }
        if (!agreedPrice || isNaN(agreedPrice) || parseFloat(agreedPrice) <= 0) {
            return res.status(400).json({ message: "El precio acordado debe ser un número positivo válido" });
        }

        // Validar que partsOrdered no sea true si partsRequested es false
        const partsRequestedBool = partsRequested === 'true' || partsRequested === true;
        const partsOrderedBool = partsOrdered === 'true' || partsOrdered === true;
        if (partsOrderedBool && !partsRequestedBool) {
            return res.status(400).json({ message: "No puedes marcar 'Partes Solicitadas' si no has marcado 'Necesita Partes'" });
        }

        const filePath = req.file ? req.file.path : null;

        const readyForPickupBool = readyForPickup === 'true' || readyForPickup === true;

        const report = new Report({
            clientName,
            clientAddress,
            clientPhone,
            clientDNI,
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
            files: filePath,
            user: req.user._id,
        });

        console.log("🚀 Reporte a guardar:", report);

        const createdReport = await report.save();
        console.log("🚀 Reporte creado exitosamente:", createdReport);
        res.status(201).json(createdReport);
    } catch (error) {
        console.error("Error al crear el reporte:", error);
        res.status(500).json({ message: "Error al crear el reporte", error: error.message });
    }
};

// Obtener todos los reportes
export const getReports = async (req, res) => {
    try {
        const reports = await Report.find({}).populate('user', 'name email');
        console.log("🚀 Reportes obtenidos:", reports);
        res.json(reports);
    } catch (error) {
        console.error("Error al obtener los reportes:", error);
        res.status(500).json({ message: 'Error al obtener los reportes', error: error.message });
    }
};

// Actualizar un reporte
export const updateReport = async (req, res) => {
    console.log("🚀 Datos recibidos en updateReport:", req.body, req.file);

    try {
        const report = await Report.findById(req.params.id);

        if (!report) {
            return res.status(404).json({ message: "Reporte no encontrado" });
        }

        const filePath = req.file ? req.file.path : report.files;

        // Validar datos requeridos
        if (req.body.clientName && !req.body.clientName) {
            return res.status(400).json({ message: "El nombre del cliente es obligatorio" });
        }
        if (req.body.clientAddress && !req.body.clientAddress) {
            return res.status(400).json({ message: "La dirección del cliente es obligatoria" });
        }
        if (req.body.clientPhone && !req.body.clientPhone) {
            return res.status(400).json({ message: "El teléfono del cliente es obligatorio" });
        }
        if (req.body.clientDNI && !req.body.clientDNI) {
            return res.status(400).json({ message: "El DNI del cliente es obligatorio" });
        }
        if (req.body.equipment) {
            if (!req.body.equipment.type || !req.body.equipment.brand || !req.body.equipment.model) {
                return res.status(400).json({ message: "El tipo, marca y modelo del equipo son obligatorios" });
            }
        }
        if (req.body.faultDescription && !req.body.faultDescription) {
            return res.status(400).json({ message: "La descripción de la falla es obligatoria" });
        }
        if (req.body.receptionDate && !req.body.receptionDate) {
            return res.status(400).json({ message: "La fecha de recepción es obligatoria" });
        }
        if (req.body.deliveryDate && !req.body.deliveryDate) {
            return res.status(400).json({ message: "La fecha de entrega es obligatoria" });
        }
        if (req.body.agreedPrice && (isNaN(req.body.agreedPrice) || parseFloat(req.body.agreedPrice) <= 0)) {
            return res.status(400).json({ message: "El precio acordado debe ser un número positivo válido" });
        }

        // Validar que partsOrdered no sea true si partsRequested es false
        const partsRequestedBool = req.body.partsRequested !== undefined
            ? (req.body.partsRequested === 'true' || req.body.partsRequested === true)
            : report.partsRequested;
        const partsOrderedBool = req.body.partsOrdered !== undefined
            ? (req.body.partsOrdered === 'true' || req.body.partsOrdered === true)
            : report.partsOrdered;
        if (partsOrderedBool && !partsRequestedBool) {
            return res.status(400).json({ message: "No puedes marcar 'Partes Solicitadas' si no has marcado 'Necesita Partes'" });
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
        });

        const updatedReport = await report.save();
        console.log("🚀 Reporte actualizado exitosamente:", updatedReport);
        res.json(updatedReport);
    } catch (error) {
        console.error("Error al actualizar el reporte:", error);
        res.status(500).json({ message: "Error al actualizar el reporte", error: error.message });
    }
};

// Eliminar un reporte
export const deleteReport = async (req, res) => {
    try {
        const report = await Report.findByIdAndDelete(req.params.id);

        if (report) {
            console.log("🚀 Reporte eliminado:", report);
            res.json({ message: 'Reporte eliminado' });
        } else {
            res.status(404).json({ message: 'Reporte no encontrado' });
        }
    } catch (error) {
        console.error("Error al eliminar el reporte:", error);
        res.status(500).json({ message: 'Error al eliminar el reporte', error: error.message });
    }
};
