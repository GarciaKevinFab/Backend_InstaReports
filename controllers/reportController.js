import Report from '../models/Report.js';

// Obtener todos los reportes
export const getReports = async (req, res) => {
    const reports = await Report.find({});
    res.json(reports);
};

// Crear un reporte
export const createReport = async (req, res) => {
    const { title, description, amount } = req.body;

    const report = new Report({
        title,
        description,
        amount,
        user: req.user._id,
    });

    const createdReport = await report.save();
    res.status(201).json(createdReport);
};

// Actualizar un reporte
export const updateReport = async (req, res) => {
    const { title, description, amount } = req.body;
    const report = await Report.findById(req.params.id);

    if (report) {
        report.title = title || report.title;
        report.description = description || report.description;
        report.amount = amount || report.amount;

        const updatedReport = await report.save();
        res.json(updatedReport);
    } else {
        res.status(404).json({ message: 'Report not found' });
    }
};

// Eliminar un reporte
// Eliminar un reporte
export const deleteReport = async (req, res) => {
    const report = await Report.findByIdAndDelete(req.params.id); // Usa findByIdAndDelete directamente

    if (report) {
        res.json({ message: 'Report removed' });
    } else {
        res.status(404).json({ message: 'Report not found' });
    }
};

