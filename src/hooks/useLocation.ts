import { useEffect, useState } from 'react';

export interface LocationItem {
  code: string;
  name_with_type: string;
  name: string;
  parent_code?: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export function useLocation() {
  const [provinces, setProvinces] = useState<LocationItem[]>([]);
  const [districts, setDistricts] = useState<LocationItem[]>([]);
  const [wards, setWards] = useState<LocationItem[]>([]);

  const [provinceCode, setProvinceCode] = useState<string>('');
  const [districtCode, setDistrictCode] = useState<string>('');
  const [wardCode, setWardCode] = useState<string>('');

  useEffect(() => {
    fetch(`${BASE_URL}/location/provinces`)
      .then((res) => res.json())
      .then(setProvinces)
      .catch(() => setProvinces([]));
  }, []);

  useEffect(() => {
    if (!provinceCode) {
      setDistricts([]);
      setDistrictCode('');
      setWards([]);
      setWardCode('');
      return;
    }
    fetch(`${BASE_URL}/location/districts/${provinceCode}`)
      .then((res) => res.json())
      .then((data) => setDistricts(data))
      .catch(() => setDistricts([]));

    setDistrictCode('');
    setWards([]);
    setWardCode('');
  }, [provinceCode]);

  useEffect(() => {
    if (!districtCode) {
      setWards([]);
      setWardCode('');
      return;
    }
    fetch(`${BASE_URL}/location/wards/${districtCode}`)
      .then((res) => res.json())
      .then((data) => setWards(data))
      .catch(() => setWards([]));

    setWardCode('');
  }, [districtCode]);

  return {
    provinces,
    districts,
    wards,
    provinceCode,
    setProvinceCode,
    districtCode,
    setDistrictCode,
    wardCode,
    setWardCode,
  };
}
