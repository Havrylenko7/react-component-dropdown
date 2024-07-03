import Dropdown from './Dropdown';

function App() {
  const list1 = ['Toronto', 'Lviv', 'Berlin', 'Sydney', 'Rome', 'Paris', 'Seoul'];
  const list2 = ['Cairo', 'Mumbai', 'Bangkok', 'Lviv', 'Dnipro', 'Beijing'];

  return (
    <div className="appWrapper">
      <Dropdown items={list1} />
      <Dropdown items={list2} />
    </div>
  )
}

export default App
