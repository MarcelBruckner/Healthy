import * as React from 'react';
import { FormControl, useFormControlContext } from '@mui/base/FormControl';
import { styled } from '@mui/system';
import clsx from 'clsx';
import { Box, Input, Typography } from '@mui/material';

export default function BasicFormControl({ id, value, label, multiline, errors, icon }: { id: string, value?: any, label: string, multiline?: boolean, errors?: string[], icon: any }) {
    const Icon = icon;
    return (
        <>
            <FormControl key={id} defaultValue={value} placeholder={label} style={{ width: 'full' }} >
                <Box sx={{ display: 'flex', alignItems: 'flex-end', alignContent: 'top', width: 'full' }}>
                    <Icon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <Label >{label}</Label>
                </Box>
                <Input id={id}
                    name={id}
                    placeholder={errors ? errors.join('\n') : label}
                    multiline={multiline}
                    sx={{ width: 'full' }}
                    defaultValue={value}
                    error={!!errors}
                    fullWidth
                />
            </FormControl>

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
