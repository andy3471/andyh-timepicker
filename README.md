# AndyH-Timepicker
This is a simple Time Picker component written in Vue JS.

![ScreenShot](https://raw.github.com/andy3471/andyh-timepicker/master/docs/img/timepicker-default.jpg)


## Install

Install with NPM with:

    npm install andyh-timepicker

Import the component into your Vue App:

    import AndyHTimePicker from 'andyh-timepicker'
    ...

    export default {
        ...
        components: {
            'time-picker': AndyHTimePicker
        }
    }

Use the Component with:

    <time-picker></time-picker>


## Data Binding

You can use the Time Picker with V-model to your own data

    <time-picker v-model="datevalue"></time-picker>

Otherwise, this will act like a text input, with the string of the data.

## Format

Currently the data picker only support the date in 24 hour format, without the seconds, for example 22:30.

## Props

You can pass through a prop called minInterval, to set the time interval in minutes, for example

    <time-picker :minInterval="15"></time-picker>

Would return the minutes 00, 15, 30, 45

## Setting the accent color

You can set the accent color with the following prop

    <time-picker :color="#fec107"></time-picker>