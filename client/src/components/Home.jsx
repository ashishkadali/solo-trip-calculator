import React, { useEffect, useState } from 'react'
import { HomeApi } from '../API/Postapi';
import Addexpensess from './Addexpensess';
import { useNavigate } from 'react-router-dom';
import CreateTrip from './CreateTrip';
import '../css/Home.css';


export default function Home() {
    const [homePageList, setHomePageList] = useState([]);
    const navigate = useNavigate();

    // useEffect(() => {
    //     HomeApi().then((res) => {
    //         const responseData = JSON.parse(res.body)
    //         setHomePageList(responseData)
    //     });
    // }, []);

    const moretripinfo=(value)=>{
        if(!value){
            return;
        }
        <Addexpensess details={value}/>
        navigate('/addexpensess')
    }

    const createNewTrip = () =>{
        <CreateTrip/>
        navigate('/createnewtrip')

    }

    return (
        <div className='Home'>
            {
                (homePageList.length > 0) ?
                    <div>
                        <div>
                            <button onClick={()=>createNewTrip()}>create trip</button>
                        </div>

                       { 
                            homePageList.map((value, index, list) => (
                                <div onClick={()=> moretripinfo(value)} key={index} className='HomeList'>
                                    <li>
                                        {value.tripname}
                                    </li>
        ]                        </div>
                            ))
                        }
                    </div>

                    :
                        <div className='createNewTrip'>
                                <button onClick={()=>createNewTrip()}>create trip</button>
                        </div>
            }
        </div>
    )
}