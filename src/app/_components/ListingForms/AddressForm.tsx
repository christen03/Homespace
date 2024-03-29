import { useForm } from "react-hook-form";

import { useListingStore } from "~/stores/listing";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { env } from "~/env.mjs";
import {
  type Dispatch,
  type SetStateAction,
  useMemo,
  useState,
  useEffect,
} from "react";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { format } from "path";

type TFormValues = {
  title: string;
};

type Location = {
  lat: number;
  lng: number;
};

type PlacesAutoCompleteProps = {
  setSelected: Dispatch<SetStateAction<Location | null>>;
  setFormattedAddress: Dispatch<SetStateAction<string>>;
};


type MapProps = {
  selected: Location | null;
  setSelected: Dispatch<SetStateAction<Location | null>>;
  setFormattedAddress: Dispatch<SetStateAction<string>>;
}
const PlacesAutoComplete: React.FC<PlacesAutoCompleteProps> = ({
  setSelected,
  setFormattedAddress
}) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (address: string) => {
    setValue(address, false);
    clearSuggestions();

    const results = await getGeocode({ address });
    if (results[0]) {
      const { lat, lng } = getLatLng(results[0]);
      const location: Location = { lat, lng };
      setSelected(location);
      setFormattedAddress(results[0].formatted_address);
    }
  };

  return (
    <Combobox onSelect={handleSelect}>
      <ComboboxInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        className="combobox-input w-full p-2"
        placeholder="Search an address"
      />
      <ComboboxPopover>
        <ComboboxList>
          {status === "OK" &&
            data.map(({ place_id, description }) => (
              <ComboboxOption key={place_id} value={description} />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
};

function Map({selected, setSelected, setFormattedAddress}: MapProps) {
  const ucsdGeoCode = useMemo(
    () => ({ lat: 32.8800604, lng: -117.2340135 }),
    [],
  );

  useEffect(() => {
    console.log(selected, "new selected");
  }, [selected]);

  return (
    <>
      <div className="relative">
        <div className="absolute left-1/2 top-0 z-20 w-72 -translate-x-1/2">
          <PlacesAutoComplete setSelected={setSelected} setFormattedAddress={setFormattedAddress}/>
        </div>

        <GoogleMap
          zoom={15}
          center={selected ?? ucsdGeoCode}
          mapContainerClassName="w-full h-screen"
        >
          {selected && <Marker position={selected} />}
        </GoogleMap>
      </div>
    </>
  );
}

export default function AddressForm() {

  const [selected, setSelected] = useState<Location | null>(null)
  const [formattedAddress, setFormattedAddress] = useState<string>("")
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries: ["places"],
  });

  const listingStore = useListingStore();
  const { register, handleSubmit } = useForm<TFormValues>({
    defaultValues: { title: listingStore.title },
  });

  const onHandleFormSubmit = () => {
    if(selected){
      listingStore.setLatitude(selected.lat)
      listingStore.setLongitude(selected.lng)
      listingStore.setAddressString(formattedAddress)
    }
    listingStore.onHandleNext();
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Map selected={selected} setSelected={setSelected} setFormattedAddress={setFormattedAddress}/>
      <div className="flex justify-end">
        <button onClick={onHandleFormSubmit} disabled={!selected} className="inline-block h-11 rounded-md bg-blue-600 px-6 font-semibold text-white">
          Next
        </button>
      </div>
      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={listingStore.onHandleBack}
          className="inline-block h-11 rounded-md bg-blue-600 px-6 font-semibold text-white"
        >
          Back
        </button>
      </div>
    </>
  );
}

