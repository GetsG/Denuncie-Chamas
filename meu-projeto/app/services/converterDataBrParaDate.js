export default function converterData(dataString) {
  if (!dataString) return new Date(0);

  const [dataParte, horaParte] = dataString.split(" ");
  const [dia, mes, ano] = dataParte.split("/");
  const [hora = "00", minuto = "00"] = (horaParte || "").split(":");

  return new Date(ano, mes - 1, dia, hora, minuto);
}