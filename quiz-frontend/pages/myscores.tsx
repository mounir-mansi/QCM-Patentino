'use client'
import React, { useEffect, useState } from "react";
import "../app/globals.css";
import { Button, Table } from 'flowbite-react';
import PiedDePage from "@/components/Footer";
import Menu from "@/components/Menu";
import AnimatedBackground from "@/components/Background";
import { useRouter } from "next/router";


const TableScores =  () =>  {
    const { push } = useRouter();
    const [achievment, setAchievment] = useState([]);

    const goToQuiz = () => {
        push("/quiz");
      }

    useEffect(() => {
       const getAchievment= async()=>{
        try {
            const userId = localStorage.getItem("user");
            const url = `/api/achievment/user/${userId}`;
            const response = await fetch(url, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
              });
              const achievmentData = await response.json();
              setAchievment(achievmentData)
              
        } catch (error) {
        console.error(error);
      }
      
    }
    getAchievment()
},[])

    return (
        <>
        <Menu />
        <div className= "container place-items-center mx-auto my-6 min-content-height max-w-4xl">
        <Table hoverable>
      <Table.Head>
        <Table.HeadCell>
          Module
        </Table.HeadCell>
        <Table.HeadCell>
          Difficulté
        </Table.HeadCell>
        <Table.HeadCell>
          Score
        </Table.HeadCell>
        <Table.HeadCell>
          Succès
        </Table.HeadCell>
        <Table.HeadCell>
          Date
        </Table.HeadCell>
        <Table.HeadCell>
          <span className="sr-only">
            
          </span>
        </Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y">
      {achievment.map((item, index) => (
            <Table.Row
              key={index}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {item.module.module_title}
              </Table.Cell>
              <Table.Cell>{item?.level}</Table.Cell>
              <Table.Cell className={item?.success ? "text-green-700" : "text-red-700"}>{item?.score} %</Table.Cell>
              <Table.Cell className={item?.success ? "text-green-700" : "text-red-700"}>{item?.success ? "Oui" : "Non"}</Table.Cell>
              <Table.Cell>{item?.date && new Date(item.date).toLocaleDateString('fr-FR')}</Table.Cell>
              <Table.Cell>
                <Button
                  color='failure' pill
                  onClick={goToQuiz}
                >
                  <p>Refaire le quiz</p>
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
      </Table.Body>
    </Table>
   </div>
    <AnimatedBackground />
    <PiedDePage />
    </>
    )

};

export default TableScores
function push(arg0: string) {
    throw new Error("Function not implemented.");
}

