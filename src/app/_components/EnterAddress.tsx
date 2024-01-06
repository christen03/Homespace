"use client"
import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
  } from "@reach/combobox";
import { useLoadScript } from "@react-google-maps/api";
import { env } from "~/env.mjs";
  import {
    type Dispatch,
    type SetStateAction,
    useMemo,
    useState,
    useEffect,
  } from "react";
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
  } from "use-places-autocomplete";
  import { type Location } from "~/types";

  type PlacesAutoCompleteProps = {
    setSelected: Dispatch<SetStateAction<Location | null>>;
  };
  

const EnterAddress: React.FC<PlacesAutoCompleteProps> = ({
  setSelected,
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
      console.log("location, ", location)
      setSelected(location)
    }
  };


  return (
    <div className="relative">
        <div className="absolute left-1/2 top-0 z-20 w-72 -translate-x-1/2">
    <Combobox onSelect={handleSelect}>
      <ComboboxInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        className="combobox-input w-full p-2"
        placeholder="Filter within 20 miles of..."
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
    </div>
    </div>
  );
};

export default EnterAddress
