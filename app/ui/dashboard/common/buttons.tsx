'use client';

import { DocumentDuplicateIcon, PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

import Button from '@mui/material/Button';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import { Fab, IconButton, styled } from "@mui/material";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import AddIcon from '@mui/icons-material/Add';


export function CreateButton({ type }: { type: 'food' | 'toilet' }) {
  const MAPPING = {
    'food': "Essen und Trinken",
    'toilet': "Toilette"
  }
  return <Fab color="primary" variant="extended" style={{ position: 'fixed', zIndex: 1, right: 30, bottom: 30 }}
    href={`/dashboard/${type}/create`}
  >
    <AddIcon sx={{ mr: 1 }} />
    {MAPPING[type]} hinzufügen
  </Fab>
}

export function EditButton({ id, type }: { id: string, type: 'food' | 'toilet' }) {
  return (
    <IconButton
      onClick={(e: React.MouseEvent) => {
        e.stopPropagation(); // don't select this row after clicking
      }}
      href={`/dashboard/${type}/${id}/edit`}
    >
      <EditOutlinedIcon />
    </IconButton >
  );
}
export function CopyButton({ id, type }: { id: string, type: 'food' | 'toilet' }) {
  return (
    <IconButton
      onClick={(e: React.MouseEvent) => {
        e.stopPropagation(); // don't select this row after clicking
      }}
      href={`/dashboard/${type}/${id}/copy`}
    >
      <ContentCopyOutlinedIcon />
    </IconButton>
  );
}

export function DeleteButton({ id, type, deleteFunc }: { id: string, type: 'food' | 'toilet', deleteFunc: (id: string) => any }) {
  const deleteEntryWithId = deleteFunc.bind(null, id);

  return (
    <IconButton
      onClick={(e: React.MouseEvent) => {
        e.stopPropagation(); // don't select this row after clicking
        deleteEntryWithId();
      }}
      href="#"
    >
      <DeleteOutlinedIcon />
    </IconButton>
  );
}
