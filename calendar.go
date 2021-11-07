package main

import (
	"log"
	"net/url"
	"os"
	"strconv"
	"time"

	"github.com/apognu/gocal"
)

type viewType string

const (
	viewTypeMonth viewType = "month"
	viewTypeWeek  viewType = "week"
	viewTypeDay   viewType = "day"
)

type dayState struct {
	Display   string   `json:"display"`
	IsToday   bool     `json:"isToday"`
	RenderKey string   `json:"renderKey"`
	Unix      int64    `json:"unix"`
	Events    []string `json:"events"`
}

type monthState struct {
	Days []dayState `json:"days"`
}

func newMonthState(start *time.Time) monthState {
	return monthState{}
}

func getInt64(values url.Values, key string) int64 {
	val, err := strconv.ParseInt(values.Get(key), 10, 64)
	if err != nil {
		log.Printf("failed to parse int64: %s", err)
	}

	return val
}

func parseCalendar(v viewType, startUnix int64) (interface{}, error) {
	f, err := os.Open("knoebber@gmail.com.ics")
	defer f.Close()
	if err != nil {
		return nil, err
	}

	start := time.Unix(startUnix, 0)

	c := gocal.NewParser(f)
	c.Start, c.End = &start, new(time.Time) // TODO

	if err := c.Parse(); err != nil {
		return nil, err
	}

	switch v {
	case viewTypeMonth:
		return newMonthState(start), nil
	}
	return nil, nil
}
