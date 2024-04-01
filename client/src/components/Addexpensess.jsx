import React, { useEffect, useState } from 'react'
import { Pie, Doughnut,Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'; // this import is mandatory to show chart
import '../css/Addexpensess.css';
import { getparticularserviceData } from '../API/Postapi';

export default function Addexpensess({props}) {

    const [expensesslist, setExpensessList] = useState([
        { category: "stay" },
        { category: "fuel" },
        { category: "food" },
        { category: "shopping" },
        { category: "other" }
    ]);

    const [overallExpensess, setoverallExpensess] = useState([
        {
            id:0,
            category: "stay",
            spent : 30
        }
        ,
        {
            id:1,
            category: "fuel",
            spent: 50,
        },
        {
            id:2,
            category: "shopping",
            spent: 30,
        },
        {
            id:3,
            category: "other",
            spent: 20
        },
        {
            id:4,
            category: "food",
            spent : 80,
        }, 

    ]);

    console.log(expensesslist)

    useEffect(()=>{
        getparticularserviceData(props.id).then((res)=>{
            setoverallExpensess(res)
        }).catch((error)=>{
            console.log("api failed")
        })
    },[])

    return (
        <div>
            <div className="name">
                <h4>Add Expensess</h4>
            </div>
            <div className="piechart">

           <Bar 
            data={{
                labels : overallExpensess.map((data)=> data.category),
                datasets : [{
                    label : "spent expensess",
                    data: overallExpensess.map((data)=> data.spent)
                }]
            }}
           />

            </div>
            <div className="expensesslist">
                { expensesslist.length >0 && expensesslist.map((value, index) => (
                    <div className="expense-item" key={index}>
                        <div style={{textAlign:'center'}}>{value.category}</div>
                        <button>+</button>
                    </div>
                ))}
            </div>

        </div>
    )
}