import { dark } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';
import { css } from 'styled-components';

const celebrity = deepMerge(dark, {
    global: {
        font: {
            family: 'Roboto',
            size: '14px',
        },
        colors: {
            background: {
                dark: '#0c0b13',
                light: '#ffffff',
            },
            'background-header': '#0c0b13',
            'background-contrast': {
                light: '#fcfcfc',
                dark: '#14131d',
            },
            'background-sidebar': {
                light: '#141123',
                dark: '#141123',
            },
            'background-back': {
                dark: '#1f2127',
                light: '#ffffff',
            },
            border: '#e6e6e6',
            brand: '#fc16de',
            control: '#fc16de',
            yellow: '#ffe138',
            blue: '#0099CC',
            indigo: '#6666FF',
            violet: '#CC3399',
            'gray-1': '#606a6a',
            'gray-2': '#646464',
            'gray-3': '#e6e6e6',
            'gray-4': '#f2f2f2',
            'gray-5': '#cccccc',
        },
    },
    button: {
        border: {
            radius: '0',
        },
        size: {
            large: {
                pad: {
                    vertical: '12px',
                    horizontal: '32px',
                },
            },
        },
    },
    list: {
        item: {
            pad: { horizontal: 'none', vertical: 'xsmall' },
        },
    },
    formField: {
        border: {
            error: {
                color: 'status-critical',
            },
            side: 'all',
        },
        focus: {
            border: {
                color: 'control',
            },
        },
        label: {
            size: 'small',
        },
        help: {
            size: 'small',
        },
        info: {
            size: 'small',
        },
        error: {
            size: 'small',
        },
        disabled: {
            background: {
                opacity: 0,
            },
            label: {
                color: 'gray-5',
            },
        },
        extend: ({ noBorder }) =>
            noBorder &&
            css`
                > div {
                    border: none;
                    padding-left: 5px;
                    padding-right: 5px;
                }
            `,
    },
    checkBox: {
        check: {
            radius: '50%',
        },
        toggle: {
            color: 'gray-2',
        },
    },
    heading: {
        color: {
            dark: '#ffffff',
            light: '#000000',
        },
        weight: 'bold',
    },
    table: {
        body: {
            align: 'center',
            pad: { horizontal: 'medium', vertical: 'xsmall' },
            border: 'horizontal',
        },
        footer: {
            align: 'start',
            border: undefined,
            pad: { horizontal: 'medium', vertical: 'small' },
            verticalAlign: 'bottom',
        },
        header: {
            align: 'center',
            border: 'bottom',
            fill: 'horizontal',
            pad: { horizontal: 'medium', vertical: 'xsmall' },
            verticalAlign: 'bottom',
            background: {
                color: 'background-contrast',
                opacity: 'strong',
            },
        },
    },
});

export default celebrity;
