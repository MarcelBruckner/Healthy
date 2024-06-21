import * as React from 'react';
import { FormControl, useFormControlContext } from '@mui/base/FormControl';
import { styled } from '@mui/system';
import clsx from 'clsx';
import { Box, Input, MenuItem, Select, Typography } from '@mui/material';

export default function SelectFormControl({ id, value, values, defaultValue, label, errors, icon }: { id: string, value: any, values: any[], defaultValue?: any, label: string, multiline?: boolean, errors?: string[], icon: any }) {
    const Icon = icon;
    return (
        <>
            <FormControl key={id} placeholder={label} style={{ width: 'full' }} >
                <Box sx={{ display: 'flex', alignItems: 'flex-end', alignContent: 'top', width: 'full' }}>
                    <Icon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <Label >{label}</Label>
                </Box>
                <Select
                    labelId={id}
                    id={id}
                    label={label}
                    name={id}
                    defaultValue={value ?? defaultValue}
                    sx={{ width: 'full' }}
                    error={!!errors}
                    fullWidth
                    variant='standard'
                    data-cy={id}
                >
                    {values.map((value, index) => <MenuItem key={value} id={value} value={index} data-cy={`${id}-${index}`}>{value}</MenuItem>)}
                </Select>
            </FormControl >

        </>
    );
}


const Label = styled(
    ({ children, className }: { children?: React.ReactNode; className?: string }) => {
        const formControlContext = useFormControlContext();
        const [dirty, setDirty] = React.useState(false);

        React.useEffect(() => {
            if (formControlContext?.filled) {
                setDirty(true);
            }
        }, [formControlContext]);

        if (formControlContext === undefined) {
            return <p>{children}</p>;
        }

        const { error, required, filled } = formControlContext;
        const showRequiredError = dirty && !filled;

        return (
            <Typography color="primary" className={clsx(className, error || showRequiredError ? 'invalid' : '')}>
                {children}
                {required ? ' *' : ''}
            </Typography>
        );
    },
)`
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  margin-bottom: 4px;

  &.invalid {
    color: red;
  }
`;

const HelperText = styled(({ errors }: { errors?: string[] }) => {
    const formControlContext = useFormControlContext();
    const [dirty, setDirty] = React.useState(false);

    React.useEffect(() => {
        if (formControlContext?.filled) {
            setDirty(true);
        }
    }, [formControlContext]);

    if (formControlContext === undefined) {
        return null;
    }

    const { required, filled } = formControlContext;
    const showRequiredError = dirty && required && !filled;

    return <p >{errors?.join("\n")}</p>;
})`
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
`;
