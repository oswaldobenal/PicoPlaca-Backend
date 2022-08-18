import mongoose from "mongoose";

const restrictionSchema = new mongoose.Schema({
  placaUno: {
    type: String,
    require: true,
    trim: true,
  },
  placaDos: {
    type: String,
    require: true,
    trim: true,
  },
  dia: {
    type: String,
    required: true,
    trim: true,
  },
  hora_inicio: {
    type: String,
    require: true,
    trim: true,
  },
  hora_fin: {
    type: String,
    require: true,
    trim: true,
  },
});

export const Restriction = mongoose.model("Restriction", restrictionSchema);
