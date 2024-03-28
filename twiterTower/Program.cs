using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace twitertower
{
    internal class Program
    {
		static void PrintTriangularTower(int high,int width)
        {
			int numLines = width-2<2? 0:(high - 2) / ((width - 2) / 2); //how many lines of * will be in every level
			int numLine3 = width-2<2?high-2:(high - 2) % ((width - 2) / 2); //how many lines of * will be in 3 level
			Console.Write(new string(' ', width/2));  //print last floor
			Console.WriteLine("*");  
			for (int k = 0;width>2 && k <numLine3; k++) //print level 3
			{
				Console.Write(new string(' ', width / 2-1));
				Console.WriteLine(new string('*', 3));
			}
			for (int i = 3; i < width; i += 2) //print other level
			{
				for (int j = 0; j < numLines; j++)
				{
					Console.Write(new string(' ', (width/2-i/2)));
					Console.WriteLine(new string('*', i));
				}
			}
			Console.WriteLine(new string('*', width));// print first floor
		}

		static void SelectedOne(int high,int width)
        {
			if (width == high || Math.Abs(high - width) > 5)
				Console.WriteLine("erea: " + (width * high));
			else
				Console.WriteLine("circumference: " + (2 * (width + high)));
		}

		static void SelectedTwo(int high, int width)
        {
			Console.WriteLine("enter 0 to print the triangle's circumference or 1 to print the triangular");
			int trchoose = int.Parse(Console.ReadLine());
			if (trchoose == 0)
			{
				double rib = Math.Sqrt(Math.Pow(high, 2) + Math.Pow((width / 2), 2));
				Console.WriteLine("the triangle's circumference is: " + (2 * (rib) + width));
			}
			else
			{
				if (width % 2 == 0 || width > 2 * high)
					Console.WriteLine("can't print triangular");
				else
				{
					PrintTriangularTower(high, width);
				}
			}
		}
		static void Main(string[] args)
        {
			int choose, high, width;
			Console.WriteLine("Press 1 for a rectangular tower, 2 for a triangular tower and 3 to exit ");
			choose = int.Parse(Console.ReadLine());
			while (choose != 3)
			{
				if (choose != 1 && choose != 2)
				{
					Console.WriteLine("Wrong choice");
				}
				else
				{
					Console.WriteLine("enter tower width");
					width = int.Parse(Console.ReadLine());
					Console.WriteLine("enter tower high");
					high = int.Parse(Console.ReadLine());
					if (choose == 1)
					{
						SelectedOne(high, width);
					}
					if (choose == 2)
					{
						SelectedTwo(high, width);
					}
					
				}
				Console.WriteLine("Press 1 for a rectangular tower, 2 for a triangular tower and 3 to exit ");
				choose = int.Parse(Console.ReadLine());
			}
		}
    }
}
