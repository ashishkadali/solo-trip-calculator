import React, { useEffect, useState } from 'react'
import {Pie,Doughnut} from 'react-chartjs-2';
import '../css/Addexpensess.css';

export default function Addexpensess() {

    const [expensesslist,setExpensessList] =useState([
        { category: "stay", spent: 100, total:200 },
        { category: "fuel", spent: 50 ,total:200 },
        { category: "food", spent: 80 , total:200 },
        { category: "shopping", spent: 30, total:200 },
        { category: "other", spent: 20 , total:200}
    ]);

    const [overallExpensess, setoverallExpensess] = useState( {
        "stay": 100,
        "fuel": 50,
        "shopping": 30,
        "other": 20,
        "food": 80,
        "total": 300 
      })

return(
    <div>
        <div className="name">
            <h4>Add Expensess</h4>
        </div>
        <div className="piechart">
        <Doughnut
                data={{
                    labels:["stay","fuel","shopping","other","food","total"],
                    datasets:[
{                        data: Object.values(overallExpensess)
}                    ]
                }}

        />

        </div>
        <div className="expensesslist">
            {
                expensesslist.length > 0 && 
                <>
               {
                   expensesslist.map((value,index,list)=> {
                    <div>
                        <>
                        {value.category}
                        </>
                        <>
                            <Pie
                            data={{
                                labels:["spent","total"],
                                datasets:[
                                    {
                                        label: `spent on ${value.category}`,
                                        data: [value.spent,value.total],
                                        backgroundColor: [
                                            'rgb(255, 205, 86)',
                                            'rgb(255, 99, 132)',
                                        ],
                                      
                                    }
                                ]
                            }}
                            />
                        </>
                    </div>
                   })
                }
                </>
            }
        </div>
    </div>
)
}