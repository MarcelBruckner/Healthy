import * as React from 'react';
import { FormControl, useFormControlContext } from '@mui/base/FormControl';
import { styled } from '@mui/system';
import clsx from 'clsx';
import { Box, Input } from '@mui/material';

import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';

export default function TimeFormControl({ id, value, label, multiline, errors }: { id: string, value?: string, label: string, multiline?: boolean, errors?: string[] }) {
    return (
        <FormControl key={id} defaultValue="" >
            <Box sx={{ display: 'flex', alignItems: 'flex-end', alignContent: 'top', width: 'full' }}>
                <AccessTimeOutlinedIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <Label >{label}</Label>
            </Box>
            <Input id={id}
                type='time'
                name={id}
                placeholder={value}
                multiline={multiline}
                sx={{ width: '100%' }}
                defaultValue={value}
                error={!!errors}
            />
            <HelperText errors={errors} />
        </FormControl>
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
        const showRequiredError = dirty && required && !filled;

        return (
            <p className={clsx(className, error || showRequiredError ? 'invalid' : '')}>
                {children}
                {required ? ' *' : ''}
            </p>
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
    const showRequiredError = dirty && !filled;

    return showRequiredError ? <p >{errors?.join("\n")}</p> : null;
})`
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
`;
