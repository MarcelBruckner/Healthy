'use client';

import Link from 'next/link';
import {
  CalendarIcon,
  HomeIcon,
  CakeIcon,
  BeakerIcon,
  ExclamationTriangleIcon,
  ChartBarIcon,
  ChevronDoubleDownIcon,
  EyeDropperIcon,
  ClipboardDocumentCheckIcon,
  UserGroupIcon,

} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createInvoice as createEntry } from '@/app/lib/actions';
import { useFormState } from 'react-dom';
import moment from 'moment';


export default function Form() {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createEntry, initialState);


  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">

        {/* Datum */}
        <div className="mb-4 flex flex-row">
          <div className='mr-4'>
            <label htmlFor="datum" className="mb-2 block text-sm font-medium">
              Datum
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="datum"
                  name="datum"
                  type="date"
                  placeholder="Datum"
                  className="peer block  rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  aria-describedby="datum-error"
                  defaultValue={moment().format('YYYY-MM-DD')}
                />
                <CalendarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
            <div id="datum-error" aria-live="polite" aria-atomic="true">
              {state.errors?.datum &&
                state.errors.datum.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>

          {/* Uhrzeit */}
          <div>
            <label htmlFor="uhrzeit" className="mb-2 block text-sm font-medium">
              Uhrzeit
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="uhrzeit"
                  name="uhrzeit"
                  type="time"
                  step="1"
                  placeholder="Uhrzeit"
                  className="peer block  rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  aria-describedby="uhrzeit-error"
                  defaultValue={moment().format('HH:mm:ss')}
                />
                <CalendarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
            <div id="uhrzeit-error" aria-live="polite" aria-atomic="true">
              {state.errors?.uhrzeit &&
                state.errors.uhrzeit.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

        {/* Ort*/}
        <div className="mb-4">
          <label htmlFor="ort" className="mb-2 block text-sm font-medium">
            Ort
          </label>
          <div className="relative  mt-2 rounded-md">
            <div className="relative">
              <input
                id="ort"
                name="ort"
                type="text"
                placeholder="Ort"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="ort-error"
              />
              <HomeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div id="ort-error" aria-live="polite" aria-atomic="true">
            {state.errors?.ort &&
              state.errors.ort.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Motivation */}
        <div className="mb-4">
          <label htmlFor="motivation" className="mb-2 block text-sm font-medium">
            Motivation
          </label>
          <div className="relative  mt-2 rounded-md">
            <div className="relative">
              <input
                id="motivation"
                name="motivation"
                type="text"
                placeholder="Motivation"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="motivation-error"
              />
              <UserGroupIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div id="motivation-error" aria-live="polite" aria-atomic="true">
            {state.errors?.motivation &&
              state.errors.motivation.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Speisen und Menge */}
        <div className="mb-4">
          <label htmlFor="speisen" className="mb-2 block text-sm font-medium">
            Speisen und Menge
          </label>
          <div className="relative  mt-2 rounded-md">
            <div className="relative">
              <input
                id="speisen"
                name="speisen"
                type="text"
                placeholder="Speisen und Menge"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="speisen-error"
              />
              <CakeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div id="speisen-error" aria-live="polite" aria-atomic="true">
            {state.errors?.speisen &&
              state.errors.speisen.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Getränke und Menge */}
        <div className="mb-4">
          <label htmlFor="getraenke" className="mb-2 block text-sm font-medium">
            Getränke und Menge
          </label>
          <div className="relative  mt-2 rounded-md">
            <div className="relative">
              <input
                id="getraenke"
                name="getraenke"
                type="text"
                placeholder="Getränke und Menge"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="getraenke-error"
              />
              <BeakerIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div id="getraenke-error" aria-live="polite" aria-atomic="true">
            {state.errors?.getraenke &&
              state.errors.getraenke.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Beschwerden / Symptome */}
        <div className="mb-4">
          <label htmlFor="beschwerden" className="mb-2 block text-sm font-medium">
            Beschwerden / Symptome
          </label>
          <div className="relative  mt-2 rounded-md">
            <div className="relative">
              <input
                id="beschwerden"
                name="beschwerden"
                type="text"
                placeholder="Wann, welche, Dauer, Schweregrad"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="beschwerden-error"
              />
              <ExclamationTriangleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div id="beschwerden-error" aria-live="polite" aria-atomic="true">
            {state.errors?.beschwerden &&
              state.errors.beschwerden.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Stuhltyp und -verhalten */}
        <div className="mb-4 flex flex-row">
          <div className='mr-4'>
            <label htmlFor="stuhltyp" className="mb-2 block text-sm font-medium">
              Stuhltyp
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <select
                  id="stuhltyp"
                  name="stuhltyp"
                  placeholder="Stuhltyp"
                  className="peer block  rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  aria-describedby="stuhltyp-error"
                >
                  {Array.from(Array(8).keys()).map(i => {
                    let text = `Typ ${i}`;
                    if (i == 0) {
                      text = "-";
                    }
                    return <option value={i} key={text}>{text}</option>
                  })}
                </select>
                <ChartBarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
            <div id="stuhltyp-error" aria-live="polite" aria-atomic="true">
              {state.errors?.stuhltyp &&
                state.errors.stuhltyp.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>

          {/* Stuhlverhalten */}
          <div className="w-full">
            <label htmlFor="stuhlverhalten" className="mb-2 block text-sm font-medium">
              Stuhlverhalten
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="stuhlverhalten"
                  name="stuhlverhalten"
                  type="text"
                  placeholder="Wann, Farbe, Menge, sonstige Auffälligkeiten"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  aria-describedby="stuhlverhalten-error"
                />
                <ChevronDoubleDownIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
            <div id="stuhlverhalten-error" aria-live="polite" aria-atomic="true">
              {state.errors?.stuhlverhalten &&
                state.errors.stuhlverhalten.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

        {/* Therapie */}
        <div className="mb-4">
          <label htmlFor="therapie" className="mb-2 block text-sm font-medium">
            Therapie
          </label>
          <div className="relative  mt-2 rounded-md">
            <div className="relative">
              <input
                id="therapie"
                name="therapie"
                type="text"
                placeholder="Medikamente, andere Behandlungen"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="therapie-error"
              />
              <EyeDropperIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div id="therapie-error" aria-live="polite" aria-atomic="true">
            {state.errors?.therapie &&
              state.errors.therapie.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Anmerkungen */}
        <div className="mb-4">
          <label htmlFor="anmerkungen" className="mb-2 block text-sm font-medium">
            Sonstige Anmerkungen
          </label>
          <div className="relative  mt-2 rounded-md">
            <div className="relative">
              <input
                id="anmerkungen"
                name="anmerkungen"
                type="text"
                placeholder="Sonstige Anmerkungen"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="anmerkungen-error"
              />
              <ClipboardDocumentCheckIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div id="anmerkungen-error" aria-live="polite" aria-atomic="true">
            {state.errors?.anmerkungen &&
              state.errors.anmerkungen.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Button */}
        <div id="status-error" aria-live="polite" aria-atomic="true">
          {state.message &&
            <p className="mt-2 text-sm text-red-500" key={state.message}>
              {state.message}
            </p>
          }
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/invoices"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Abbrechen
        </Link>
        <Button type="submit">Eintrag anlegen</Button>
      </div>
    </form>
  );
}
