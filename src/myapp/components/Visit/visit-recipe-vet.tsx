import React, {useEffect} from 'react';
import moment from 'moment';
// Hooks.
import useVisitRecipe from '../../hooks/visits/useVisitRecipes';
// My Components.
import GenericCard from '../cards/generic-card';

interface VisitCardImgProps {
  data: any;
  navigation: any;
  route: any;
  visit?: any;
}

const VisitCardRecipe = ({
  data,
  navigation,
  route,
  visit,
}: VisitCardImgProps): React.ReactElement => {
  const {details, id, title, user_pet, visit_date} = data;
  const {data: visitData, isLoading} = useVisitRecipe(id);
  const [recipes, setRecipes] = React.useState([]);

  useEffect(() => {
    if (visitData) {
      setRecipes(visitData.data);
    }
  }, [visitData]);

  const newData = {
    date: visit_date == null ? null : moment(visit_date).toDate(),
    content: details,
    data: visit,
    additionalHeader: 'Veterinaria',
    recipes,
    styleCard: {},
    title,
  };

  return (
    !isLoading && (
      <GenericCard key={newData.data?.id} data={newData} onClick={null} />
    )
  );
};

export default VisitCardRecipe;
