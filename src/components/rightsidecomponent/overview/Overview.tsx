import LoginUserChart from "./LoginUserChart";
import Statistics from "./Statistics";
import TransactionHistory from "./TransactionHistory";


export default function Overview({title}:{title:string}) {

    console.log(title)
  return (
    <div className="space-y-6 px-12">
        <Statistics/>
        <LoginUserChart />
        <TransactionHistory/>

    </div>
  )
}
