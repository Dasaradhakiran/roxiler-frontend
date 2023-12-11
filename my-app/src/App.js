import './App.css';

import TransactionsTable from "../src/components/TransactionsTable"
import TransactionsStatistics from "../src/components/TransactionsStatistics"
import TransactionsBarChart from '../src/components/TransactionsBarChart'
import TransactionsPieChart from '../src/components/TransactionsPieChart';

function App() {
  return (
    <div className="app">
      <div className='app-sub-cont'>
        <TransactionsTable key="table" />
        <TransactionsStatistics key="statistics" />
      </div>
      <div className='app-sub-cont'>
        <TransactionsBarChart key="bar chart" />
        <TransactionsPieChart key="pie chart" />
      </div>
    </div>
  );
}

export default App;
