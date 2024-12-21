package org.fatmansoft.teach.util;

import java.io.BufferedOutputStream;
import java.io.OutputStream;
import java.lang.reflect.Method;
import java.net.URL;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;

import com.itextpdf.text.*;
import org.apache.commons.codec.binary.Base64;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import com.itextpdf.text.pdf.BaseFont;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;

/**
 * ClassName : PDFUtil <br/>
 * Function : (生成PDF，工具类) <br/>
 * date : 2022年8月1日 上午9:42:11 <br/>
 *
 * @author
 * @version
 * @since JDK 1.8
 */
public class PDFUtil
{
    private static final Logger logger = LogManager.getLogger(PDFUtil.class);

    /**
     * fontSize_normal : (正文字体大小11号).
     */
    public static final float FONTSIZE_NORMAL = 11f;
    /**
     * fontSize_titile : (标题字体大小14号).
     */
    public static final float FONTSIZE_TITILE = 14f;
    /**
     * FONTSIZE_COVER : (封面字体大小32号).
     */
    public static final float FONTSIZE_COVER = 32f;

    /**
     * normalFont : (通用字体样式：宋体、11号).
     */
    private static Font normalFont = null;
    /**
     * titleFont : (通用标题字体样式：宋体、14号、加粗).
     */
    private static Font titleFont = null;
    /**
     * coverFont : (通用封面字体样式：宋体、28号、加粗).
     */
    private static Font coverFont = null;


    /**
     * getBaseFont : (获取可以解析中文的字体：使用宋体). <br/>
     *
     * @author
     * @return
     * @since JDK 1.8
     */
    public static BaseFont getBaseFontChinese()
    {
        try
        {
            // 宋体资源文件路径,可以从C://Windows//Fonts//simsun.ttc拷贝到相应目录下
            URL path = PDFUtil.class.getResource("/font/SourceHanSansSC-Regular.ttf");
            return BaseFont.createFont(path + ",0", BaseFont.IDENTITY_H, BaseFont.NOT_EMBEDDED);

            // 本地测试：使用windows自带的宋体文件
            // return BaseFont.createFont("C://Windows//Fonts//simsun.ttc,0", BaseFont.IDENTITY_H, false);
        }
        catch (Exception e)
        {
            logger.error("设置字体样式失败", e);
            return null;
        }
    }

    public static Font getChineseFont(float size, int style){
        URL path = PDFUtil.class.getResource("/font/SourceHanSansSC-Regular.ttf");
        return FontFactory.getFont(path.getPath(),BaseFont.IDENTITY_H, BaseFont.NOT_EMBEDDED,size, style,BaseColor.BLACK);
    }

    /**
     * getNormalFont : (获取普通字体样式). <br/>
     *
     * @author
     * @return
     * @since JDK 1.8
     */
    public static Font getNormalFont()
    {
        if (normalFont == null)
        {
//            BaseFont bfChinese = getBaseFontChinese();
//            normalFont = new Font(bfChinese, FONTSIZE_NORMAL, Font.NORMAL);
            normalFont = getChineseFont(FONTSIZE_NORMAL,Font.NORMAL);
        }
        return normalFont;
    }

    /**
     * getTitleFont : (获取标题通用字体). <br/>
     *
     * @author
     * @return
     * @since JDK 1.8
     */
    public static Font getTitleFont()
    {
        if (titleFont == null)
        {
//            BaseFont bfChinese = getBaseFontChinese();
//            titleFont = new Font(bfChinese, FONTSIZE_TITILE, Font.BOLD);
            titleFont = getChineseFont(FONTSIZE_TITILE,Font.BOLD);
        }
        return titleFont;
    }

    /**
     * getTitleFont : (获取封面通用字体). <br/>
     *
     * @author
     * @return
     * @since JDK 1.8
     */
    public static Font getCoverFontFont()
    {
        if (coverFont == null)
        {
//            BaseFont bfChinese = getBaseFontChinese();
//            coverFont = new Font(bfChinese, FONTSIZE_COVER, Font.BOLD);
            coverFont = getChineseFont(FONTSIZE_COVER,Font.BOLD);
        }
        return coverFont;
    }

    /**
     * getfieldValue : (通过反射，根据方法名，执行方法,最终返回行结果的toString值). <br/>
     *
     * @author
     * @param <T> 方法执行的入参
     * @param object 对象
     * @param methodName 方法名
     * @param args 方法执行参数
     * @since JDK 1.8
     */
    private static <T> String getfieldValue(T object, String methodName, Object... args)
    {
        try
        {
            Method method = object.getClass().getMethod(methodName);
            Object value = method.invoke(object, args);
            return value == null ? "" : value.toString();

        }
        catch (Exception e)
        {
            logger.error("getfieldValue error", e);
            return "";
        }
    }

    /**
     * analysisPicBase64Info : (解析base64图片信息). <br/>
     *
     * @author
     * @param picBase64Info 图片base64信息，或前台echart通过调用getDataURL()方法获取的图片信息
     * @return 图片经过base64解码后的信息
     * @since JDK 1.8
     */
    public static Element analysisPicBase64Info(String picBase64Info)
    {
        if (StringUtils.isEmpty(picBase64Info))
        {
            // 空段落
            return new Paragraph();
        }

        // 1.获取图片base64字符串信息：若入参是通过前台echarts调用getDataURL()方法获取的，则该字符串包含逗号，且则逗号后面的内容才是图片的信息
        String pictureInfoStr = picBase64Info.indexOf(",") == -1 ? picBase64Info : picBase64Info.split(",")[1];
        // 2.将图片信息进行base64解密
        byte[] imgByte = Base64.decodeBase64(pictureInfoStr);

        // 对异常的数据进行处理
        /**
         * .图片的原始表达ascii码范围是0-255，
         * .这里面有一些不可见的编码。然后为了图片正确传输才转成编码base64的0-63，
         * .当从base64转成byte时，byte的范围是[-128，127]，那么此时就会可能产生负数，而负数不是在ascii的范围里，所以需要转换一下
         */
        for (int i = 0; i < imgByte.length; i++)
        {
            if (imgByte[i] < 0)
            {
                imgByte[i] += 256;
            }
        }

        try
        {
            return Image.getInstance(imgByte);
        }
        catch (Exception e)
        {
            logger.error("analysisPicBase64Info error", e);
            return new Paragraph();
        }
    }

    /**
     * analysisPicBase64Info_batch : (批量解析base64加密的图片信息，生成Image对象). <br/>
     *
     * @author
     * @param picBase64Infos 经过base64加密的图片信息
     * @return
     * @since JDK 1.8
     */
    public static List<Element> analysisPicBase64Info_batch(List<String> picBase64Infos)
    {
        List<Element> images = new ArrayList<Element>();
        for (String li : picBase64Infos)
        {
            Element image = analysisPicBase64Info(li);
            images.add(image);
        }
        return images;
    }

    /**
     * createImage : (根据图片的base64加密文件创建pdf图片). <br/>
     *
     * @author
     * @param picBase64Info base64加密后的图片信息(支持台echart通过调用getDataURL()方法获取的图片信息)
     * @param title 段落标题
     * @param percentX 图片缩放比例X轴
     * @param percentY 图片缩放比例Y轴
     * @param titleCenter 标题是否居中，true-居中、false-默认居左
     * @return 返回图片段落
     * @since JDK 1.8
     */
    public static Paragraph createImageFromEncodeBase64(String picBase64Info, String title, float percentX,
                                                        float percentY, boolean titleCenter)
    {
        // 1.获取图片
        Element element = analysisPicBase64Info(picBase64Info);
        // 2.创建段落，并添加标题
        Paragraph paragraph = new Paragraph(title, getTitleFont());
        // 空行
        paragraph.add(Chunk.NEWLINE);
        paragraph.add(Chunk.NEWLINE);

        if (!(element instanceof Image))
        {
            // 图片解析失败
            return paragraph;
        }

        Image image = (Image) element;
        // 3.设置图片缩放比例
        image.scalePercent(percentX, percentY);
        System.out.println("image = " + image);

        // 4.图片放入该段落
        paragraph.add(image);

        return paragraph;
    }

    /**
     * createImageFromEncodeBase64_batch : (批量创建). <br/>
     *
     * @author
     * @param picBase64Infos 图片base64加密后的信息(支持台echart通过调用getDataURL()方法获取的图片信息)
     * @param percentXs X轴缩放比例
     * @param percentYs Y轴缩放比例
     * @param titleCenter 标题是否居中
     * @return
     * @since JDK 1.8
     */
    public static Paragraph createImageFromEncodeBase64_batch(List<String> picBase64Infos, String title,
                                                              List<Float> percentXs, List<Float> percentYs, Boolean titleCenter)
    {
        Paragraph paragraphs = new Paragraph(title,getTitleFont());
        paragraphs.add(Chunk.NEWLINE);
        List<Image> imagePara = createImageFromEncodeBase64(picBase64Infos, percentXs,
                percentYs);
        for (int i = 0; i < picBase64Infos.size(); i++)
        {
            if (imagePara!=null)
            {
                paragraphs.add(imagePara.get(i));
                // 空行
            }
        }
        System.out.println("paragraphs = " + paragraphs);
        return paragraphs;
    }

    public static List<Image> createImageFromEncodeBase64(List<String> picBase64Infos,
                                                          List<Float> percentXs, List<Float> percentYs){
        List<Element> elements = analysisPicBase64Info_batch(picBase64Infos);
        ArrayList<Image> images = new ArrayList<>();
        for (int i = 0; i < elements.size(); i++) {
            Element element = elements.get(i);
            if (!(element instanceof Image)){
                // 图片解析失败
                return null;
            }
            Image image = (Image) element;
            image.scalePercent(percentXs.get(i), percentYs.get(i));
            images.add(image);
        }
        return images;

    }

    /**
     * createTable : (创建table段落). <br/>
     *
     * @author
     * @param <T>
     * @param list 构建table的数据
     * @param title 该段落取的名字
     * @param methodNames 需要调用的方法名，用来获取单元格数据。通常是某个属性的get方法
     * @return
     * @since JDK 1.8
     */
    public static <T> Paragraph createTable(List<T> list, String title, String[] tableHead, List<String> methodNames)
    {
        return createTable(list, FONTSIZE_NORMAL, FONTSIZE_TITILE, title, tableHead, methodNames, false);
    }

    /**
     * createTable : (创建table段落). <br/>
     *
     * @author
     * @param <T>
     * @param list 构建table的数据
     * @param title 该段落取的名字
     * @param methodNames 需要调用的方法名，用来获取单元格数据。通常是某个属性的get方法
     * @param titleCenter 标题是否居中：true-居中，false-居左
     * @return
     * @since JDK 1.8
     */
    public static <T> Paragraph createTable(List<T> list, String title, String[] tableHead, List<String> methodNames, Boolean titleCenter)
    {
        return createTable(list, FONTSIZE_NORMAL, FONTSIZE_TITILE, title, tableHead, methodNames, titleCenter);
    }

    /**
     * createTableByList : (创建table段落). <br/>
     *
     * @author
     * @param <T>
     * @param listData
     * @param normalFontSize 正文字体大小
     * @param titleFontSize 标题字体大小
     * @param title 段落名称
     * @param methodNames 获取表格属性的方法名
     * @param titleCenter 段落标题是否水平居中，true：需要居中；false：默认靠左
     * @return
     * @since JDK 1.8
     */
    public static <T> Paragraph createTable(List<T> listData, float normalFontSize, float titleFontSize,
                                            String title, String[] tableHead, List<String> methodNames,Boolean titleCenter)
    {
        // 1.创建一个段落
        Paragraph paragraph = new Paragraph(title, getTitleFont());
        // 空行
        paragraph.add(Chunk.NEWLINE);
        paragraph.add(Chunk.NEWLINE);

        // 3.创建一个表格
        PdfPTable table = new PdfPTable(methodNames.size());// 列数
        paragraph.add(table);

        // 4.构造表头
        for (String head : tableHead)
        {
            head = StringUtils.isEmpty(head) ? "" : head;
            PdfPCell cell = new PdfPCell(new Paragraph(head, getNormalFont()));
            cell.setBackgroundColor(
                    new BaseColor(Integer.parseInt("124"), Integer.parseInt("185"), Integer.parseInt("252")));// 背景色
            cell.setMinimumHeight(Float.parseFloat("15"));// 单元格最小高度
            cell.setHorizontalAlignment(Element.ALIGN_CENTER);// 水平居中
            table.addCell(cell);
        }

        if (CollectionUtils.isEmpty(listData))
        {
            // 没有数据，添加一行空单元格，并返回
            for (int i = 0; i < methodNames.size(); i++)
            {
                table.addCell(new Paragraph(" "));// 有一个空格，否则添加不了
            }
            return paragraph;
        }

        // 5.构造table数据
        for (T li : listData)
        {
            for(String name : methodNames)
            {
                String valueStr = getfieldValue(li, name);
                PdfPCell cell = new PdfPCell(new Paragraph(valueStr, getNormalFont()));
                cell.setHorizontalAlignment(Element.ALIGN_CENTER);// 水平居中
                table.addCell(cell);
            }
        }
        // 5.返回
        return paragraph;
    }

    /**
     * addToTable : (从段落中找到第一个table，向该table中追加数据). <br/>
     * (). <br/>
     *
     * @author
     * @param <T>
     * @param paragraph
     * @param listData
     * @param methodNames
     * @since JDK 1.8
     */
    public static <T> void addToTable(Paragraph paragraph, List<T> listData, List<String> methodNames)
    {
        for (Element ele : paragraph)
        {
            if (!(ele instanceof PdfPTable))
            {
                // 不是table元素，直接跳过
                continue;
            }

            // 找到第一个table元素
            PdfPTable table = (PdfPTable) ele;
            for (T data : listData)
            {
                for (String name : methodNames)
                {
                    String valueStr = getfieldValue(data, name);
                    PdfPCell cell = new PdfPCell(new Paragraph(valueStr, getNormalFont()));
                    cell.setHorizontalAlignment(Element.ALIGN_CENTER);// 水平居中
                    table.addCell(cell);
                }
            }
            break;
        }

    }

    /**
     * exportDocument : (生成并下载PDF文档). <br/>
     * (). <br/>
     *
     * @author
     * @param document 文档对象
     * @param cover 封面：若不是null，则会先添加封面，并另起新页面添加段落
     * @param paragraphs 需要组成PDF文件的段落
     * @param response 请求的响应对象
     * @param fileName 生成的文件名称，不需要加pdf后缀
     * @since JDK 1.8
     */
    public static void exportDocument(Document document, Paragraph cover, List<Paragraph> paragraphs,
                                      HttpServletResponse response, String fileName)
    {
        try (ServletOutputStream out = response.getOutputStream())
        {
            response.setContentType("application/pdf;charset=UTF-8");
            response.setHeader("Content-Disposition", "attachment;fileName=" + URLEncoder.encode(fileName + ".pdf", "UTF-8"));

            PdfWriter.getInstance(document, out);
            // 打开文档
            document.open();

            if (cover != null)
            {
                document.add(cover);
                // 起新页面
                document.newPage();
            }

            StringBuilder errorMsg = new StringBuilder();
            for (int i = 0; i < paragraphs.size(); i++)
            {
                try
                {
                    // 将段落添加到文档
                    document.add(paragraphs.get(i));
                    // 空行
                    document.add(Chunk.NEWLINE);
                    document.add(Chunk.NEWLINE);
                }
                catch (DocumentException e)
                {
                    errorMsg.append("PDF文件生成出错，请检查第：").append(i).append("个段落");
                }
            }

            if (!StringUtils.isEmpty(errorMsg.toString()))
            {
                logger.error(errorMsg);
            }

            // 关闭文档
            System.out.println("out = " + out);
            document.close();
            out.flush();
            out.close();
        }
        catch (Exception e)
        {
            logger.error("生成PDF文档并下载，出错：", e);
        }

    }

    /**
     * setDefaultIndentationLeft : (设置段落默认左边距). <br/>
     *
     * @author
     * @param paragraph
     * @since JDK 1.8
     */
    public static void setDefaultIndentationLeft(Paragraph paragraph)
    {
        paragraph.setIndentationLeft(Float.parseFloat("30"));
    }

    /**
     * addBlankLine : (添加空行). <br/>
     *
     * @author
     * @param paragraph 需要添加空行的段落
     * @param lineNum 需要添加空行的个数
     * @since JDK 1.8
     */
    public static void addBlankLine(Paragraph paragraph, int lineNum)
    {
        if (paragraph == null)
        {
            return;
        }

        for (int i = 0; i < lineNum; i++)
        {
            paragraph.add(Chunk.NEWLINE);
        }
    }
}

