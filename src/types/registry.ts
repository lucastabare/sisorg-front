export type RowDto = {
    Name: string;
    Value:
    number; Color: string
};

export type DataDto = {
    ID: number;
    Count: number;
    Timestamp: string;
    Rows: RowDto[]
};

export type RowViewModel = {
    name: string;
    value: number;
    color: string
};

export type DataViewModel = {
    id: number;
    count: number;
    timestamp: string; rows:
    RowViewModel[]
};

export const mapRowDto = (r: RowDto): RowViewModel => ({ 
    name: r.Name, 
    value: r.Value, 
    color: r.Color 
});

export const mapDataDto = (d: DataDto): DataViewModel => ({
    id: d.ID, 
    count: d.Count, 
    timestamp: d.Timestamp, 
    rows: d.Rows.map(mapRowDto),
});
