import * as React from 'react';
import { FormControl, useFormControlContext } from '@mui/base/FormControl';
import { styled } from '@mui/system';
import clsx from 'clsx';
import { Box, Input } from '@mui/material';
import TodayOutlinedIcon from '@mui/icons-material/TodayOutlined';
import moment from 'moment';

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
                inputProps={{ max: moment().format("YYYY-MM-DD") }}
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
