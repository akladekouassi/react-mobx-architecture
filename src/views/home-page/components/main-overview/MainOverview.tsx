import React, { useEffect } from 'react';
import { Item } from 'semantic-ui-react';
import { observer } from 'mobx-react';
import { useRootStore } from '../../../../utilities/mobxUtil';

interface IProps {}

export const MainOverview: React.FC<IProps> = observer((props) => {
  const { showsStore } = useRootStore();

  useEffect(() => {
    showsStore.requestShow();
  }, [showsStore]);

  const { data, error } = showsStore.show;

  if (!data || error) {
    return null;
  }

  const image: string = data.image?.medium ?? '';
  const network: string = data.network?.name ?? '';

  return (
    <Item.Group>
      <Item>
        <Item.Image src={image} />
        <Item.Content>
          <Item.Header as="a">{data.name}</Item.Header>
          <Item.Meta>{network}</Item.Meta>
          <Item.Description>
            <div dangerouslySetInnerHTML={{ __html: data.summary }} />
          </Item.Description>
          <Item.Extra>{data.genres.join(' | ')}</Item.Extra>
        </Item.Content>
      </Item>
    </Item.Group>
  );
});
