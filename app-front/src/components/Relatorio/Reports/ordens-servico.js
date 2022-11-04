import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from "pdfmake/build/vfs_fonts";
import logo from '../../../static/logo.jpg'

function ordensServicoPDF(ordensServico){
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    // alert(pagamentos.total)
    const reportTitle = [
        {
            image: logo,
            fit:[140,70]
        }
    ];

    const dados = ordensServico.pagas.map((os) => {
        return [
            {text: os.idOrdemServico, fontSize: 9, margin: [0,2,0,2]}, 
            {text: os.dataOS, fontSize: 9, margin: [0,2,0,2]}, 
            {text: os.placaVeiculo,  fontSize: 9, margin: [0,2,0,2]}, 
            {text: os.total.toFixed(2), fontSize: 9, margin: [0,2,0,2]}
        ]
    });

    const dados1 = ordensServico.naoPagas.map((os) => {
        return [
            {text: os.idOrdemServico, fontSize: 9, margin: [0,2,0,2]}, 
            {text: os.dataOS, fontSize: 9, margin: [0,2,0,2]}, 
            {text: os.placaVeiculo,  fontSize: 9, margin: [0,2,0,2]}, 
            {text: os.total.toFixed(2), fontSize: 9, margin: [0,2,0,2]}
        ]
    });

    const details = [
        {
            text: 'Ordens de Serviços',
            fontSize: 24,
            bold: true,
            // margin: [15,20,0,45] // left, top, right, bottom
            alignment:'center'
        },
        {text: 'Total Geral: '+ ordensServico.total.toFixed(2), fontSize: 14, bold: true, margin: [0, 20, 0, 8]},
        {text: 'Pagas | Total: '+ ordensServico.subtotalPagas.toFixed(2), fontSize: 14, bold: true, margin: [0, 20, 0, 8]},
        {
            table: {
                headerRows: 1,
                widths: ['*','*','*','*'],
				body: [
					[{text: 'Código', style: 'tableHeader', fontSize: 10}, {text: 'Data', style: 'tableHeader', fontSize: 10}, 
                    {text: 'Placa do Veículo', style: 'tableHeader', fontSize: 10}, {text: 'Total', style: 'tableHeader', fontSize: 10}],
					...dados
				]
            },
            layout: 'lightHorizontalLines',
        },
        {text: 'Não Pagas | Total: '+ordensServico.subtotalNaoPagas.toFixed(2), fontSize: 14, bold: true, margin: [0, 20, 0, 8]},
        {
            table: {
                headerRows: 1,
                widths: ['*','*','*','*'],
				body: [
					[{text: 'Código', style: 'tableHeader', fontSize: 10}, {text: 'Data', style: 'tableHeader', fontSize: 10}, 
                    {text: 'Placa do Veículo', style: 'tableHeader', fontSize: 10}, {text: 'Total', style: 'tableHeader', fontSize: 10}],
					...dados1
				]
            },
            layout: 'lightHorizontalLines',
        }
    ];

    function Rodape(currentPage, pageCount) {
        return [
            {
                text: currentPage + ' / ' + pageCount,
                alignment: 'right',
                fontSize: 9,
                margin: [0,10,20,0] // left, top, right, bottom
            }
        ]
    };

    const docDefinitios = {
        pageSize: 'A4',
        pageMargins: [15,50,15,40],

        header: [reportTitle],
        content: [details],
        footer: Rodape
    };
    pdfMake.createPdf(docDefinitios).open({}, window.open('', '_blank'));
}

export default ordensServicoPDF;