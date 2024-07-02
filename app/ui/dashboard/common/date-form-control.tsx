import * as React from 'react';
import { FormControl } from '@mui/base/FormControl';
import { Box, Input } from '@mui/material';
import TodayOutlinedIcon from '@mui/icons-material/TodayOutlined';
import moment from 'moment';
import { HelperText, Label } from './form-control-utils';

export default function DateFormControl({ id, value, label, multiline, errors }: { id: string, value?: string, label: string, multiline?: boolean, errors?: string[] }) {
    return (
        <FormControl key={id} defaultValue="">
            <Box sx={{ display: 'flex', alignItems: 'flex-end', alignContent: 'top', width: 'full' }}>
                <TodayOutlinedIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <Label >{label}</Label>
            </Box>
            <Input id={id}
                type='date'
                name={id}
                placeholder={value}
                multiline={multiline}
                sx={{ width: '100%' }}
                defaultValue={value}
                error={errors ? true : false}
            // inputProps={{ max: moment(new Date()).format("YYYY-MM-DD") }}
            />
            <HelperText errors={errors} />
        </FormControl>
    );
}

