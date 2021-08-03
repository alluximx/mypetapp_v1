import React, {useEffect, useState} from 'react';
import DropdownPicker from '../inputs/dropdown-picker';
import useMunicipality from '../../hooks/util/useMunicipality';
const MunicipalityDrop = (props): React.ReactElement => {
  const [townList, setTownList] = useState([]);
  const dataMunicipality = useMunicipality(props.id);
  useEffect(() => {
    if (dataMunicipality.data) {
      let aux = [];
      dataMunicipality.data.data.forEach((element) => {
        aux.push({
          value: element.id,
          label: element.name,
        });
      });
      setTownList(aux);
      props.status && setTown('');
    }
  }, [dataMunicipality.data, dataMunicipality.isFetched]);
  const [town, setTown] = useState('');

  return (
    <DropdownPicker
      style={{marginTop: 6}}
      data={townList}
      currentValue={town}
      placeholder="Municipio/Delegación"
      setCurrentValue={(towId) => {
        setTown(towId);
        props.change(towId);
      }}
      disabled={props.status}
    />
  );
};
export default MunicipalityDrop;
