import React, {useEffect, useState} from 'react';
import DropdownPicker from '../inputs/dropdown-picker';
import useMunicipality from '../../hooks/util/useMunicipality';
const MunicipalityDrop = (props): React.ReactElement => {
  const [townList, setTownList] = useState([]);
  const dataMunicipality = useMunicipality(props.id);
  useEffect(() => {
    if (dataMunicipality.data) {
      const aux = [];
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
  const [town, setTown] = useState(props.idTown);

  return (
    <DropdownPicker
      style={{marginTop: 6}}
      data={townList}
      currentValue={town}
      placeholder="Municipio/Delegación"
      setCurrentValue={(townId) => {
        setTown(townId);
        let aux = '';
        townList.map((item) => {
          item.value === townId && (aux = item.label);
        });
        props.change(townId, aux);
      }}
      disabled={props.status}
    />
  );
};
export default MunicipalityDrop;
