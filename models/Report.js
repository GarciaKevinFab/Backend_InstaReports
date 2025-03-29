import mongoose from 'mongoose';

<<<<<<< HEAD
const reportSchema = mongoose.Schema(
    {
        clientName: { type: String, required: true },
        clientAddress: { type: String, required: true },
        clientPhone: { type: String, required: true },
        clientDNI: { type: String, required: true },
        equipment: {
            type: { type: String, required: true },
            brand: { type: String, required: true },
            model: { type: String, required: true },
            serial: { type: String, required: true },
            patrimonialCode: { type: String },
        },
        faultDescription: { type: String, required: true },
        observations: { type: String },
        maintenanceType: { type: String, enum: ['Corrective', 'Preventive'], required: true },
        status: { type: String, enum: ['Operative', 'Inoperative'], default: 'Operative' },
        agreedPrice: { type: Number, required: true },
        comments: { type: String },
        receptionDate: { type: Date },
        deliveryDate: { type: Date },
        files: { type: String }, // Ruta del archivo adjunto
        partsRequested: { type: Boolean, default: false }, // Indica si se necesitan partes
        partsDetails: { type: String, default: "" }, // Detalles de las partes solicitadas
        partsOrdered: { type: Boolean, default: false }, // Estado del pedido de partes
        readyForPickup: { type: Boolean, default: false }, // Indica si el equipo está listo para recoger
        user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' }, // Técnico responsable
=======
const reportSchema = new mongoose.Schema({
    clientName: { type: String, required: true },
    clientAddress: { type: String, required: true },
    clientPhone: { type: String, required: true },
    clientDNI: { type: String, required: true },
    equipment: {
        type: { type: String, required: true },
        brand: { type: String, required: true },
        model: { type: String, required: true },
        serial: { type: String },
        patrimonialCode: { type: String },
>>>>>>> e254d02 (Falta estilos y mejora pdf)
    },
    faultDescription: { type: String, required: true },
    observations: { type: String },
    maintenanceType: { type: String, enum: ['Corrective', 'Preventive'], default: 'Corrective' },
    status: { type: String, enum: ['Operative', 'Inoperative'], default: 'Operative' },
    agreedPrice: { type: Number, required: true },
    comments: { type: String },
    receptionDate: { type: Date, required: true },
    deliveryDate: { type: Date, required: true },
    partsRequested: { type: Boolean, default: false },
    partsDetails: { type: String },
    partsOrdered: { type: Boolean, default: false },
    readyForPickup: { type: Boolean, default: false },
    files: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Report', reportSchema);