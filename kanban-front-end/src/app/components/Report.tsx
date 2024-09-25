import { IReport } from "@/types/task.types";
import { Button } from "./ui/buttons/Button";

import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import { useMutation, useQuery } from "@tanstack/react-query";
import { taskService } from "@/services/task.service";
import { toast } from "sonner";

export function Report({ name, text, taskId, grade, rating }: IReport) {
  const [value, setValue] = useState(0);

  const { mutate } = useMutation({
    mutationKey: ["grade-report"],
    mutationFn: () => taskService.writeGradeReport(taskId, { grade: value }),
    onSuccess(data) {
      setValue(data.data.grade);
      toast.success("Оценка отправлена");
    },
    onError(data) {
      toast.error("Ошибка");
    },
  });

  const whiteGrade = () => {
    mutate();
  };

  useEffect(() => {
    if (grade != undefined) {
      setValue(grade);
    }
  }, [grade]);

  return (
    <div className="border-solid border border-gray-300 rounded-lg w-[300px] p-2 mx-auto">
      <p className="text-center">Отчёт</p>
      <div className="flex justify-between">
      <p className="my-1">Выполнил: {name}</p>
      <div className="flex">
        <p>{rating}</p>
        <Rating name="customized-1" defaultValue={1} readOnly max={1} />
      </div>
      </div>
      <p className="my-1">{text}</p>
      <div>
        <Box
          sx={{
            "& > legend": { mt: 2 },
          }}
          className="flex align-center"
        >
          <Rating
            name="simple-controlled"
            value={value}
            onChange={(event, newValue) => {
              if (newValue !== null) {
                setValue(newValue);
                whiteGrade();
              }
            }}
          />
        </Box>
      </div>
    </div>
  );
}
