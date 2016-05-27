package servlet.stockmarket;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;

import VO.BenchVO;

/**
 * Servlet implementation class GetMarketkLineServlet
 */
@WebServlet("/GetMarketkLineServlet")
public class GetMarketkLineServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public GetMarketkLineServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 *��ȡk��ͼ����Ҫ������
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		    BenchVO sv=(BenchVO)request.getSession().getAttribute("BenchMarket");
			String historydata[][]=sv.getData();
			String data="[";
			for (int i = historydata.length-1; i >=0 ; i--) {
				data=data+"{'date':'"+historydata[i][0]+"','value':["+
						historydata[i][1]+","+historydata[i][4]+","+
						historydata[i][3]+","+historydata[i][2]+"],'volume':"+
						historydata[i][5]+"},";
			}
			data+="]";

			JSONArray json = new JSONArray(data);
			PrintWriter out = response.getWriter();
			out.println(json);
			out.flush();
			out.close();
		
	}

}