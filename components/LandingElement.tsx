"use client"

import {useState} from "react";
import ClickLeadModal from "./ClickLeadModal";

interface LandingElementProps{
    name:string;
    description:string;
    image?:string; // Optionnel si vous voulez ajouter une image plus tard
}

export default function LandingElement({name,description}:LandingElementProps){
    const [openModal,setOpenModal]=useState(false);

    const handleClick=()=>{
        setOpenModal(true);
    };

    return (
        <>
        <div  onClick={handleClick} className="border p-4 rounded hover:bg-gray-100 cursor-pointer">
            <h3 className="text-lg font-semibold">{name}</h3>
            <p className="text-sm text-gray-600">{description}</p>
        </div>

        {openModal && (<ClickLeadModal elementName={name} onClose={()=>setOpenModal(false)}/>)}
        </>
    )
}


