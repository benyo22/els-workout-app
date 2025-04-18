import { useState } from "react";
import { useSelector } from "react-redux";

import { Button } from "primereact/button";
import { FaPlus, FaChartLine } from "react-icons/fa6";
import { ConfirmDialog } from "primereact/confirmdialog";

import { selectUserId } from "@/store/slices/authSlice";
import { ErrorMessage } from "@/views/helper/ErrorMessage";
import { WeightForm } from "@/views/weight/components/WeightForm";
import { WeightTable } from "@/views/weight/components/WeightTable";
import { WeightStatistics } from "@/views/statistics/WeightStatistics";
import { useGetWeightByUserIdQuery } from "@/api/endpoints/weightEndpoints";

export const Weight = () => {
  const userId = useSelector(selectUserId);
  const {
    data: weightData,
    isLoading,
    isError,
    error,
  } = useGetWeightByUserIdQuery(userId);

  const [showForm, setShowForm] = useState(false);
  const [selectedWeight, setSelectedWeight] = useState(null);
  const [showStatistics, setShowStatistics] = useState(false);

  return (
    <>
      {isError ? (
        <ErrorMessage message={error.data.error} />
      ) : showStatistics ? (
        <div className="settings-container h-[340px]">
          <WeightStatistics setVisible={setShowStatistics} />
        </div>
      ) : (
        <div className="list-container">
          <h2 className="text-2xl font-bold mb-4">Súly Napló</h2>

          <div className="flex gap-x-4">
            <Button
              label=" Új Bejegyzés"
              icon={<FaPlus className="mr-1" />}
              className="edit-button flex items-center mb-2"
              onClick={() => {
                setSelectedWeight(null);
                setShowForm(true);
              }}
              unstyled
            />

            <Button
              icon={<FaChartLine className="ml-1" />}
              onClick={() => setShowStatistics(true)}
              className="edit-button flex items-center mb-2"
              unstyled
            />
          </div>

          {isLoading ? (
            <p>Adatok betöltése...</p>
          ) : (
            <WeightTable
              weightData={weightData}
              onSelect={() => setShowForm(true)}
              selectedWeight={selectedWeight}
              setSelectedWeight={setSelectedWeight}
            />
          )}

          {showForm && (
            <WeightForm
              userId={userId}
              selectedWeight={selectedWeight}
              onClose={() => {
                setShowForm(false);
                setSelectedWeight(null);
              }}
            />
          )}
          <ConfirmDialog />
        </div>
      )}
    </>
  );
};
