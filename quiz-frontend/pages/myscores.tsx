'use client'
import React, { useEffect, useState } from "react";
import "../app/globals.css";
import { Button, Table } from 'flowbite-react';
import PiedDePage from "@/components/Footer";
import Menu from "@/components/Menu";
import AnimatedBackground from "@/components/Background";
import { useRouter } from "next/router";

type ModuleInfo = {
  module_title: string;
};

type Achievment = {
  id: number;
  module: ModuleInfo;
  level: string;
  score: number;
  success: boolean;
  date: string;
};

const TableScores = () => {
  const { push } = useRouter();
  const [achievment, setAchievment] = useState<Achievment[]>([]);

  const goToQuiz = () => {
    push("/quiz");
  };

  useEffect(() => {
    const getAchievment = async () => {
      try {
        const userId = localStorage.getItem("user");
        const url = `/api/achievment/user/${userId}`;
        const response = await fetch(url, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const achievmentData = await response.json();
        setAchievment(achievmentData);
      } catch (error) {
        console.error(error);
      }
    };
    getAchievment();
  }, []);

  const groupedByModule = achievment.reduce((acc, item) => {
    const title = item.module?.module_title ?? "Inconnu";
    if (!acc[title]) acc[title] = [];
    acc[title].push(item);
    return acc;
  }, {} as Record<string, Achievment[]>);

  return (
    <div className="flex flex-col min-h-screen">
      <Menu />
      <AnimatedBackground />
      <div className="relative z-10 flex-1 w-full max-w-4xl mx-auto px-4 py-6">

        {/* Desktop : tableau 5 colonnes */}
        <div className="hidden sm:block overflow-x-auto rounded-lg shadow">
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Module</Table.HeadCell>
              <Table.HeadCell>Difficulté</Table.HeadCell>
              <Table.HeadCell>Score</Table.HeadCell>
              <Table.HeadCell>Succès</Table.HeadCell>
              <Table.HeadCell>Date</Table.HeadCell>
              <Table.HeadCell><span className="sr-only"></span></Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {achievment.map((item, index) => (
                <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {item.module.module_title}
                  </Table.Cell>
                  <Table.Cell>{item?.level}</Table.Cell>
                  <Table.Cell className={item?.success ? "text-green-700" : "text-red-700"}>
                    {item?.score} %
                  </Table.Cell>
                  <Table.Cell className={item?.success ? "text-green-700" : "text-red-700"}>
                    {item?.success ? "Oui" : "Non"}
                  </Table.Cell>
                  <Table.Cell>
                    {item?.date && new Date(item.date).toLocaleDateString('fr-FR')}
                  </Table.Cell>
                  <Table.Cell>
                    <Button color='failure' pill onClick={goToQuiz}>
                      <p>Refaire le quiz</p>
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>

        {/* Mobile : un titre + tableau 4 colonnes par module */}
        <div className="sm:hidden flex flex-col gap-6">
          {achievment.length === 0 ? (
            <p className="text-center text-gray-600 mt-10">Vous n'avez pas encore fait de quiz.</p>
          ) : (
            Object.entries(groupedByModule).map(([moduleTitle, items]) => (
              <div key={moduleTitle}>
                <h2 className="text-lg font-bold text-gray-900 mb-2 px-1">{moduleTitle}</h2>
                <div className="rounded-lg shadow">
                  <Table hoverable className="table-fixed w-full">
                    <Table.Head>
                      <Table.HeadCell className="px-2 py-2 text-xs">Difficulté</Table.HeadCell>
                      <Table.HeadCell className="px-2 py-2 text-xs">Score</Table.HeadCell>
                      <Table.HeadCell className="px-2 py-2 text-xs">Succès</Table.HeadCell>
                      <Table.HeadCell className="px-2 py-2 text-xs">Date</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                      {items.map((item, index) => (
                        <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                          <Table.Cell className="px-2 py-2 text-xs">{item?.level}</Table.Cell>
                          <Table.Cell className={`px-2 py-2 text-xs ${item?.success ? "text-green-700" : "text-red-700"}`}>
                            {item?.score} %
                          </Table.Cell>
                          <Table.Cell className={`px-2 py-2 text-xs ${item?.success ? "text-green-700" : "text-red-700"}`}>
                            {item?.success ? "Oui" : "Non"}
                          </Table.Cell>
                          <Table.Cell className="px-2 py-2 text-xs">
                            {item?.date && new Date(item.date).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' })}
                          </Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table>
                </div>
                <div className="flex justify-center mt-3">
                  <Button color='failure' pill onClick={goToQuiz}>
                    Refaire le quiz
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
      <PiedDePage />
    </div>
  );
};

export default TableScores;