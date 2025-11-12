'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card } from '@/components/ui/card';
import React from 'react';

interface ResponsiveTableProps<T> {
  data: T[];
  columns: {
    key: keyof T;
    label: string;
    render?: (value: T[keyof T], item: T) => React.ReactNode;
  }[];
  mobileCardRender?: (item: T) => React.ReactNode;
}

export function ResponsiveTable<T extends { id: string | number }>({
  data,
  columns,
  mobileCardRender,
}: ResponsiveTableProps<T>) {
  return (
    <>
      {/* Desktop: Standard table */}
      <div className="hidden md:block overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((col) => (
                <TableHead key={String(col.key)}>{col.label}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                {columns.map((col) => (
                  <TableCell key={String(col.key)}>
                    {col.render
                      ? col.render(item[col.key], item)
                      : String(item[col.key])}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {/* Mobile: Card layout */}
      <div className="md:hidden space-y-3">
        {data.map((item) => (
          <Card key={item.id} className="p-4">
            {mobileCardRender ? (
              mobileCardRender(item)
            ) : (
              <div className="space-y-2">
                {columns.map((col) => (
                  <div key={String(col.key)} className="flex justify-between text-sm">
                    <span className="font-medium text-muted-foreground">
                      {col.label}:
                    </span>
                    <span className="font-medium">
                      {col.render
                        ? col.render(item[col.key], item)
                        : String(item[col.key])}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </Card>
        ))}
      </div>
    </>
  );
}
