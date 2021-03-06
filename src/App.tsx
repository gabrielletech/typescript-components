import React, { ReactElement, ReactNode, } from 'react';
import './App.css';

// Conventional Props
const Heading = ({ title }: { title: string }) => {
    return (
      <h1>{title}</h1>
    )
}

const HeadingWithContent = ({ children }: { children: ReactNode }): ReactElement => {
  return (
    <h1>{children}</h1>
  )
}

// default props/ defaultProps
const defaultContainerProps = {
  heading: <strong>My heading</strong>
}

type ContainerProps = { children: ReactNode } & typeof defaultContainerProps;

const Container = ({ heading, children }: ContainerProps): ReactElement => {
  return (
    <div><h1>{heading}</h1></div>
  )
}

// functional props
const TextWithNumber = ({ header, children }: { header: (num: number) => ReactNode; children: (num: number) => ReactNode }) => {
    const [state, setState] = React.useState<number>(0);

    return (
      <div>
        <h2>{header?.(state)}</h2>
        <div>
          {children(state)}
        </div>
        <div>
          <button onClick={() => setState(state + 1)}>Add</button>
        </div>
      </div>
    )
}

// List  (generics)
function List<ListItem>({
  items,
  render,
}: {
  items: ListItem[],
  render: (item: ListItem) => ReactNode
}) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>
          {render(item)}
        </li>
      ))}
    </ul>

  )
}

// class component
class MyHeader extends React.Component<{
    title: ReactNode, 
}> {
  render() {
    return (
      <h1>{this.props.title}</h1>
    )
  }
}

Container.defaultProps = defaultContainerProps;

const App = () => {
  return (
    <div>
      <Heading title="Hello There" />
      <HeadingWithContent><strong>hi</strong></HeadingWithContent>
      <Container>hi!</Container>
      <TextWithNumber header={(num: number) => <span>Header {num}</span>}>
        {(num: number) => <div>Today's number is {num} </div>}
      </TextWithNumber>
      <List items={["Tylo", "Muzi", "Boitumelo"]} render={(item: string) => <div>{item.toLowerCase()}</div> } />
      <MyHeader title="there ya go"/>
    </div>
  );
}

export default App;
