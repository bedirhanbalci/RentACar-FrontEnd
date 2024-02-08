export function storeRentalState(rental: any) {
  localStorage.setItem("rental", JSON.stringify(rental));
}

export function loadRentalState() {
  const defaultState = {
    assurance: "",
    additional: [],
    startDate: "",
    endDate: "",
  };
  const rentalStateInStorage = localStorage.getItem("rental");
  if (!rentalStateInStorage) return defaultState;
  try {
    return JSON.parse(rentalStateInStorage);
  } catch {
    return defaultState;
  }
}
