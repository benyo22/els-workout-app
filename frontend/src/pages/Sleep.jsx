import { useGetSleepByUserIdQuery } from "@api/endpoints/sleepEndpoints";
import { ErrorMessage } from "@features/errormessage/ErrorMessage";
import { SleepForm } from "@features/sleep/SleepForm";
import { SleepTable } from "@features/sleep/SleepTable";
import { SleepStatistics } from "@features/statistics/SleepStatistics";
import { selectUserId } from "@store/slices/authSlice";
import { Button } from "primereact/button";
import { ConfirmDialog } from "primereact/confirmdialog";
import { useState } from "react";
import { FaChartLine } from "react-icons/fa6";
import { useSelector } from "react-redux";

export const Sleep = () => {
  const userId = useSelector(selectUserId);
  const {
    data: sleepData,
    isLoading,
    isError,
    error,
  } = useGetSleepByUserIdQuery(userId);

  const [showForm, setShowForm] = useState(false);
  const [selectedSleep, setSelectedSleep] = useState(null);
  const [showStatistics, setShowStatistics] = useState(false);

  return (
    <>
      {isError ? (
        <ErrorMessage message={error.data.error} />
      ) : showStatistics ? (
        <div className="settings-container h-[340px]">
          <SleepStatistics setVisible={setShowStatistics} />
        </div>
      ) : (
        <div className="list-container">
          <h2 className="text-2xl font-bold mb-4">Alvásaim</h2>

          <div className="flex gap-x-4">
            <Button
              label="+ Új Bejegyzés"
              className="edit-button flex items-center mb-2"
              onClick={() => {
                setSelectedSleep(null);
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
            <SleepTable
              sleepData={sleepData}
              onSelect={() => setShowForm(true)}
              selectedSleep={selectedSleep}
              setSelectedSleep={setSelectedSleep}
            />
          )}

          {showForm && (
            <SleepForm
              userId={userId}
              selectedSleep={selectedSleep}
              onClose={() => {
                setShowForm(false);
                setSelectedSleep(null);
              }}
            />
          )}
          <ConfirmDialog />
        </div>
      )}
    </>
  );
};
