import { FaCheck } from "react-icons/fa6";
import { Formik, Form } from 'formik';
import type { FormikProps } from 'formik';
import { z } from 'zod';
import { v7 as uuidv7 } from 'uuid';
import { useContext, type ChangeEvent } from "react";
import { TextField, Checkbox, Slider } from '@mui/material';
import { SetsContext } from "../contexts/SetsContext";
import { formatInterval, type Set } from "../storage";

const schema = z.object({
  name: z.string().min(1, "Name is required."),
  phrases: z.array(z.string().min(1, "Phrase cannot be empty")).min(1, "Phrases cannot be empty"),
  interval: z.object({
    min: z.number().min(0, "Interval has to positive"),
    max: z.number().min(0, "Interval has to positive"),
  }),
  randomize: z.boolean(),
  forceFullUseBeforeLoop: z.boolean(),
});

export default function Options() {
  const { sets, addSet, updateSet } = useContext(SetsContext);

  const query = new URLSearchParams(window.location.search);
  const operation = query.get('operation') || "create";
  const id = query.get('id');
  const currentSet = sets.find(s => s.id == id) || {} as Set;

  const formikInitialValues = {
    name: currentSet.name || "",
    phrases: currentSet.phrases || [],
    interval: currentSet.interval || { min: 30, max: 5 * 60 },
    randomize: currentSet.randomize ?? false,
    forceFullUseBeforeLoop: currentSet.forceFullUseBeforeLoop ?? false,
  }

  const formikValidate = (values: typeof formikInitialValues) => {
    const result = schema.safeParse(values);
    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        const key = err.path[0] as keyof typeof values;
        errors[key] = err.message;
      });
      return errors;
    }
    return {};
  };

  return (
    <div className="min-h-screen bg-pulse-bg flex flex-col items-center gap-4 p-4 relative font-sans">
      {/* Title */}
      <h1 className="w-full h-14 text-2xl flex justify-center items-center text-pulse-accent font-extrabold">
        {operation[0].toUpperCase()}{operation.slice(1)}
      </h1>
      {/* Form */}
      <Formik<typeof formikInitialValues>
        initialValues={formikInitialValues}
        validate={formikValidate}
        onSubmit={(values: typeof formikInitialValues) => {
          if (operation == "create" || operation == "copy") {
            addSet({
              id: uuidv7(),
              bg: operation == "copy" ? currentSet.bg : "default.jpg",
              custom: true,
              name: values.name,
              phrases: values.phrases,
              interval: values.interval,
              randomize: values.randomize,
              forceFullUseBeforeLoop: values.forceFullUseBeforeLoop,
            } as Set)
          }
          if (operation == "edit") {
            updateSet({
              ...currentSet,
              custom: true,
              name: values.name,
              phrases: values.phrases,
              interval: values.interval,
              randomize: values.randomize,
              forceFullUseBeforeLoop: values.forceFullUseBeforeLoop,
            })
          }
          window.location.href = "marketplace";
        }}
      >
        {({ errors, values, setFieldValue, handleChange }: FormikProps<typeof formikInitialValues>) => {
          const handlePhraseChange = (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
            const name = e.target.name;
            const match = name.match(/phrases\[(\d+)\]/);
            if (!match) return;
            const idx = parseInt(match[1], 10);
            const val = e.target.value;
            if (idx < values.phrases.length) {
              if (val === "") {
                const newPhrases = values.phrases.filter((_, i) => i !== idx);
                setFieldValue('phrases', newPhrases);
              } else {
                const newPhrases = [...values.phrases];
                newPhrases[idx] = val;
                setFieldValue('phrases', newPhrases);
              }
            } else {
              if (val !== "") {
                const newPhrases = [...values.phrases, val]; // add empty placeholder
                setFieldValue('phrases', newPhrases);
                // focus new placeholder
                setTimeout(() => {
                  const input = document.querySelector(`input[name="phrases[${newPhrases.length - 1}]"`);
                  if (input) (input as HTMLInputElement).focus();
                }, 0);
              }
            }
          }
          return (
            <Form className="w-full max-w-sm flex flex-col gap-1">
              {/* Home */}
              <button
                type="submit"
                className="absolute top-4 right-4 text-pulse-accent border border-2 rounded-lg p-2 hover:scale-[1.02] transition-all"
              >
                <FaCheck size={35} />
              </button>
              <TextField
                label="Name"
                name="name"
                value={values.name}
                onChange={handleChange}
                error={Boolean(errors.name)}
                helperText={errors.name}
                fullWidth
                className="mt-1"
              />
              <label className="mt-4 flex flex-col gap-2">
                Phrases
                {values.phrases.map((_, i) => (
                  <TextField
                    label={`#${i + 1}`}
                    name={`phrases[${i}]`}
                    value={values.phrases[i]}
                    onChange={handlePhraseChange}
                    error={Boolean(errors.phrases)}
                    helperText={errors.phrases}
                    fullWidth
                    className="mt-1"
                  />
                ))}
                <TextField
                  label={`#${values.phrases.length + 1}`}
                  name={`phrases[${values.phrases.length}]`}
                  value={""}
                  onChange={handlePhraseChange}
                  error={Boolean(errors.phrases)}
                  helperText={errors.phrases}
                  fullWidth
                  className="mt-1"
                />
              </label>
              <label className="mt-4">
                Interval ({formatInterval(values.interval.min, values.interval.max)}):
                <Slider
                  name="interval"
                  value={[values.interval.min, values.interval.max]}
                  min={5}
                  max={15 * 60}
                  step={5}
                  sx={{ color: 'var(--color-accent)' }}
                  onChange={(_, newValue) => {
                    const roundToNearestStep = (val: number) => {
                      const step = val < 60 ? 5 : 30;
                      return Math.round(val / step) * step;
                    };
                    const [newMin, newMax] = newValue;
                    setFieldValue('interval.min', roundToNearestStep(newMin));
                    setFieldValue('interval.max', roundToNearestStep(newMax));
                  }}
                />
              </label>
              <label>
                Options
                <label className="flex items-center gap-1 -ml-2">
                  <Checkbox
                    name="randomize"
                    checked={values.randomize}
                    onChange={handleChange}
                    sx={{ '&.Mui-checked': { color: 'var(--color-accent)' } }}
                  />
                  Randomize order
                </label>
                <label className="flex items-center gap-1 -ml-2">
                  <Checkbox
                    name="forceFullUseBeforeLoop"
                    checked={values.forceFullUseBeforeLoop}
                    onChange={handleChange}
                  />
                  Use all phrases before looping
                </label>
              </label>
            </Form>
          )
        }}
      </Formik >
    </div >
  );
}

