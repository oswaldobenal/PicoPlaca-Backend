import { Restriction } from "../models/Restriction.js";

const getDbData = async () => {
  const data = await Restriction.find();
  return data;
};

export const createRestriction = async (req, res) => {
  const { placaUno, placaDos, dia, hora_inicio, hora_fin } = req.body;
  try {
    const dbInfo = await getDbData();
    const data = dbInfo.filter(
      (el) => el.placaUno === placaUno || el.placaDos === placaDos
    );
    if (data.length)
      return res.status(400).json({ error: "Este numero ya esta registrado" });
    const days = dbInfo.filter((el) => el.dia === dia);
    if (days.length) {
      return res.status(400).json({
        error: "Solo puedes restringir dos placas para cada dia",
      });
    }
    await Restriction.create({
      placaUno,
      placaDos,
      dia,
      hora_inicio,
      hora_fin,
    });
    return res.status(201).json({
      message: "Created Successfully",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getAllRestrictions = async (req, res) => {
  try {
    const dbInfo = await Restriction.find();
    return res.json(dbInfo);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const editRestrictions = async (req, res) => {
  const { id } = req.params;
  const { placaUno, placaDos } = req.body;
  try {
    if (isNaN(placaUno) === true) {
      return res.status(400).json({
        error: "Las placas deben ser numeros enteros",
      });
    }
    if (isNaN(placaDos) === true) {
      return res.status(400).json({
        error: "Las placas deben ser numeros enteros",
      });
    }
    const data = await Restriction.findOne({ _id: id });
    await data.updateOne(req.body);
    return res.json({
      message: "Restriction updated Successfully",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const verifyPlaca = async (req, res) => {
  const { placa, dia } = req.body;
  try {
    const placaArr = placa.split("");
    const lastNumber = placaArr.pop();
    const dbInfo = await Restriction.find();
    const permision = dbInfo.filter(
      (el) =>
        (el.placaUno === lastNumber || el.placaDos === lastNumber) &&
        el.dia === dia
    );
    if (!permision.length) {
      return res.json({ message: "El vehiculo puede circular." });
    }
    return res.json({
      message: `El vehiculo no puede circular en el siguiente horario: ${permision.map(
        (el) => el.hora_inicio
      )} - ${permision.map((el) => el.hora_fin)}`,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getDetail = async (req, res) => {
  const { id } = req.params;
  const dbData = await Restriction.findById(id);
  if (!dbData) {
    return res.status(400).json({ message: "No se encontro la restriccion." });
  }
  return res.json(dbData);
};

export const deleteRestriction = async (req, res) => {
  const { id } = req.params;
  try {
    await Restriction.findByIdAndDelete({ _id: id });
    return res.json({ message: "Restriction Deleted Successfully!" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
