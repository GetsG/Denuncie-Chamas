export default function capturarLocalizacao(setValue, setLatitude, setLongitude) {
  if (!navigator.geolocation) {
    alert("Geolocalização não suportada");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      setValue("latitude", latitude);
      setValue("longitude", longitude);

      setLatitude(latitude);
      setLongitude(longitude);

    },
    (error) => {
      console.error("Erro ao obter localização:", error);
      alert("Não foi possível capturar a localização");
    },
      {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0
  }
  );
}