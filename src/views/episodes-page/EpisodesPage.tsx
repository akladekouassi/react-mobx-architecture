import React, { useContext, useEffect } from 'react';
import IEpisodeTable from '../../stores/shows/computed/IEpisodeTable';
import LoadingIndicator from '../components/loading-indicator/LoadingIndicator';
import EpisodesTable from './components/episodes-table/EpisodesTable';
import { observer } from 'mobx-react';
import { rootStoreContext } from '../../stores/RootStore';
import { RouteComponentProps } from 'react-router-dom';

interface IRouteParams {}
interface IProps extends RouteComponentProps<IRouteParams> {}

const EpisodesPage: React.FC<IProps> = observer((props) => {
  const { showsStore } = useContext(rootStoreContext);

  useEffect(() => {
    showsStore.requestEpisodes();
  }, [showsStore]);

  const { isRequesting } = showsStore.episodes;
  const episodeTables = showsStore.selectEpisodes;

  return (
    <>
      <LoadingIndicator isActive={isRequesting} />
      {episodeTables.map((model: IEpisodeTable) => (
        <EpisodesTable key={model.title} tableData={model} />
      ))}
    </>
  );
});

export default EpisodesPage;
