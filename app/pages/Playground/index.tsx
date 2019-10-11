import * as React from 'react';
import styled from 'styled-components';
import { Grid, Segment } from 'semantic-ui-react';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;

  background-color: darkolivegreen;
  height: 100%;
  padding: 1em;

  & .ui.grid {
    margin: 0;

    & .row:first-child .column:last-child {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;

      * {
        margin-bottom: 0; // since flex does not have collapsible margins

        &:first-child {
          flex: 1;
          background-color: #9acb2e;
        }
      }
    }
  }
`;

interface Props {
}

const Playground: React.FC<Props> = ({ children }) => {
  return <Wrapper>
    <Grid columns='equal' celled>
      <Grid.Row>
        <Grid.Column>
          <Segment>1</Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment>1</Segment>
          <Segment>2</Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment>1</Segment>
          <Segment>2</Segment>
          <Segment>3</Segment>
          <Segment>4</Segment>
        </Grid.Column>
      </Grid.Row>

      <Grid.Row stretched>
        <Grid.Column width={13}>
          <Segment>10</Segment>
        </Grid.Column>
        <Grid.Column width={3}>
          <Segment>6</Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Wrapper>;
};


export default Playground;
