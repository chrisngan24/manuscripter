import java.io.BufferedReader;
import java.io.FileReader;
import java.io.FileWriter;
import java.util.ArrayList;


public class BookParser{
	public static void main(String[] args){

		ArrayList<String> array = readFromTxt("books.txt");
		String[] result = parseArray(array);
		printArray(result);
		//writeJSON(result);
	}

	public static String[] parseArray(ArrayList<String> array){
		String[] result = new String[array.size()];
		 array.toArray(result);
		 return result;

	}

	public static void printArray(String[] array){
		for(int i =0; i < array.length; i++){
			System.out.print("'" + array[i]+ "', ");
		}
	}

	// public static void writeJSON(String[] array){
	// 	JSONObject json = new JSONObject();
	// 	json.put("books", array);
	// 	try{
	// 		FileWriter writer = new FileWriter("books.json");
	// 		//writer.write('"' + json.toString() + '"');
	// 		writer.write(json.toString());
	// 		writer.close();
	// 	} catch(Exception e){

	// 	}
	// }

 	public static ArrayList<String> readFromTxt(String filePath){
 		ArrayList<String> array = new ArrayList();
 		try{
 			BufferedReader reader = new BufferedReader(new FileReader(filePath));
 			String line = null;
 			while((line = reader.readLine())!= null){
 				array.add(line);
 			}

 		} catch(Exception e){
 			System.out.println("error");
 		}

 		return array;
 	}

}