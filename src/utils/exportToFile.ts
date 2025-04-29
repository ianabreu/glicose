import { format } from 'date-fns';
import * as FileSystem from 'expo-file-system';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';

import { GlucoseWithGlycemicRangeDTO } from '@/@types/Glucose';
import { GlycemicRangeDTO } from '@/@types/GlycemicRange';
import { UserDTO } from '@/@types/User';
import { calculateGlycemicRange } from '@/utils/calculateGlycemicRange';
type CategoryMetrics = {
  average: number;
  max: number;
  min: number;
  total: number;
  totalOk: number;
  totalOut: number;
};
type GlucoseMetrics = CategoryMetrics & {
  byCategory: Record<string, CategoryMetrics>;
};

function calculateMetrics(glucoseRecords: GlucoseWithGlycemicRangeDTO[]): GlucoseMetrics {
  if (glucoseRecords.length === 0) {
    return { average: 0, max: 0, min: 0, total: 0, byCategory: {}, totalOk: 0, totalOut: 0 };
  }

  const total = glucoseRecords.length;
  const average = glucoseRecords.reduce((acc, item) => acc + item.valueInMgDl, 0) / total;
  const { min, max } = glucoseRecords.reduce(
    (acc, item) => {
      if (item.valueInMgDl < acc.min.valueInMgDl) acc.min = item;
      if (item.valueInMgDl > acc.max.valueInMgDl) acc.max = item;
      return acc;
    },
    { min: glucoseRecords[0], max: glucoseRecords[0] }
  );

  const byCategory: Record<string, CategoryMetrics & { sum: number }> = {};

  glucoseRecords.forEach((item) => {
    const key = item.glycemicRangeId;
    if (!byCategory[key]) {
      byCategory[key] = {
        total: 0,
        sum: 0,
        average: 0,
        min: item.valueInMgDl,
        max: item.valueInMgDl,
        totalOk: 0,
        totalOut: 0,
      };
    }
    const cat = byCategory[key];
    cat.total += 1;
    cat.sum += item.valueInMgDl;
    cat.min = Math.min(cat.min, item.valueInMgDl);
    cat.max = Math.max(cat.max, item.valueInMgDl);
    if (!item.glycemicRange) {
      return;
    }
    if (
      item.valueInMgDl > item.glycemicRange.glucose_min &&
      item.valueInMgDl <= item.glycemicRange?.glucose_normal
    ) {
      cat.totalOk += 1;
    } else {
      cat.totalOut += 1;
    }
  });
  let totalOk = 0;
  let totalOut = 0;
  // calcular média para cada categoria
  for (const key in byCategory) {
    byCategory[key].average = byCategory[key].sum / byCategory[key].total;
    totalOk += byCategory[key].totalOk;
    totalOut += byCategory[key].totalOut;
  }

  return {
    average,
    max: max.valueInMgDl,
    min: min.valueInMgDl,
    total,
    totalOk,
    totalOut,
    byCategory,
  };
}

export const exportToFile = {
  async toPDF(
    data: GlucoseWithGlycemicRangeDTO[],
    user: UserDTO | null,
    glycemicRanges: GlycemicRangeDTO[],
    period: { start: string; end: string }
  ) {
    if (user == null) {
      return;
    }
    const metrics = calculateMetrics(data);

    const metricRows: {
      description: string;
      total: number;
      average: number;
      min: number;
      max: number;
      totalOk: number;
      totalOut: number;
    }[] = glycemicRanges
      .filter((item) => Object.keys(metrics.byCategory).includes(item.id))
      .map((item) => {
        return {
          description: item.description,
          total: metrics.byCategory[item.id].total,
          average: metrics.byCategory[item.id].average,
          max: metrics.byCategory[item.id].max,
          min: metrics.byCategory[item.id].min,
          totalOk: metrics.byCategory[item.id].totalOk,
          totalOut: metrics.byCategory[item.id].totalOut,
        };
      });

    const metricRowsHTML = metricRows
      .map(
        (item) => `
      <tr>
            <td>${item.description}</td>
            <td>${item.total}</td>
            <td>${item.average} mg/dL</td>
            <td>${item.totalOk}</td>
            <td>${item.totalOut}</td>
            <td>${item.min} mg/dL</td>
            <td>${item.max} mg/dL</td>
            </tr>
    `
      )
      .join('');

    const rows = data
      .map((item) => {
        const { response, color } = calculateGlycemicRange({
          value: item.valueInMgDl,
          range: item.glycemicRange,
        });
        return `
      <tr>
      <td>${format(new Date(item.date), 'dd/MM/yyyy,  HH:mm')}</td>

      <td>${item.valueInMgDl}</td>
      <td>${item.glycemicRange?.description}</td>
    <td style="">
    <span style="color: ${color}; background-color: ${color}33; font-weight: 600; padding: 0.25rem 0.5rem; border-radius: 0.25rem">
    ${response}
          </span>
          </td>
          <td>${item.notes}</td>
          </tr>
          `;
      })
      .join('');

    const html = `
    <html>
    <head>
    <meta charset="UTF-8" />
    <title>Relatório de Glicemia</title>
    <style>
      :root {
        --primary: #005cd9;
        --bg: #f8f9fa;
        --text: #36404e;
        }
        @page {
          margin-top: 20mm;
          margin-bottom: 20mm;
          margin-left: 15mm;
          margin-right: 15mm;
          }
          html {
            font-size: 75%;
}
body {
  font-family: Arial, sans-serif;
  color: var(--text);
  line-height: 1.6;
  font-size: 0.875rem;
  }
  
  h1 {
    font-size: 1.75rem;
    text-align: center;
    color: var(--primary);
    margin-bottom: 1rem;
      }

      section:not(:last-child) {
        margin-bottom: 2rem;
        }
        
        h2 {
        color: var(--primary);
        font-size: 1.125rem;
        border-bottom: 2px solid var(--primary);
        margin-bottom: 0.5rem;
        }
        
        ul {
          list-style: none;
          padding: 0;
          margin: 0;
      }
      
      li {
        margin-bottom: 0.25rem;
        }
        
        table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.875rem;
          }
          
          th,
          td {
            padding: 0.5rem;
            border: 1px solid #ddd;
            text-align: center;
            }

      th {
        background-color: #d3dff0;
        }
        
      tr:nth-child(even) {
        background-color: #e6effb;
      }
      
      footer {
        text-align: center;
        font-size: 0.85rem;
        color: #666;
        margin-top: 2.5rem;
        }
        </style>
        </head>
        <body>
        <h1>Relatório de Glicemia</h1>
        <section>
        <h2>Informações do Paciente</h2>
      <ul>
      <li><strong>Nome: </strong>${user.name} ${user.lastName}</li>
      <li><strong>Período de Apuração: </strong>${period.start} a ${period.end}</li>
      </ul>
      </section>
      <section>
      <h2>Resumo Total e por Faixa Glicêmica</h2>
      <table>
        <thead>
          <tr>
            <th>Faixa</th>
            <th>Qtd. de Registros</th>
            <th>Média</th>
            <th>Dentro da Faixa</th>
            <th>Fora da Faixa</th>
            <th>Valor mínimo</th>
            <th>Valor máximo</th>
            </tr>
        </thead>
        <tbody>
        ${metricRowsHTML}
        <tr>
        <td><strong>Total</strong></td>
        <td>${metrics.total}</td>
        <td>${metrics.average} mg/dL</td>
        <td>${metrics.totalOk}</td>
        <td>${metrics.totalOut}</td>
            <td>${metrics.min} mg/dL</td>
            <td>${metrics.max} mg/dL</td>
            </tr>
            </tbody>
      </table>
      
        </section>

        <section>
        <h2>Detalhamento dos Registros</h2>
        <table>
        <thead>
        <tr>
        <th>Data/Hora</th>
        <th>Valor (mg/dL)</th>
            <th>Faixa</th>
            <th>Status da Glicemia</th>
            <th>Observações</th>
          </tr>
          </thead>
        <tbody>
        ${rows}
        </tbody>
        </table>
        </section>

        <footer>
      <p>
      Relatório gerado pelo aplicativo <strong>Glicose</strong> em
      ${format(new Date(), 'dd/MM/yyyy,  HH:mm:ss')}
      </p>
    </footer>
    </body>
    </html>
    `;

    const fileName = `Relatório de Glicemia ${period.start.replaceAll('/', '-')} a ${period.end.replaceAll('/', '-')}.pdf`;
    const newPath = `${FileSystem.documentDirectory}${fileName}`;

    const { uri } = await Print.printToFileAsync({
      html,
      margins: { bottom: 20, left: 20, right: 20, top: 20 },
    });
    await FileSystem.moveAsync({
      from: uri,
      to: newPath,
    });
    await shareAsync(newPath, {
      UTI: '.pdf',
      mimeType: 'application/pdf',
      dialogTitle: 'Compartilhar Relatório de Glicemia',
    });
  },
};
