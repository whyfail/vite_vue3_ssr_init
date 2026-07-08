import { screen } from "@testing-library/vue";
import { describe, expect, it } from "vitest";
import { Alert, AlertDescription, AlertTitle } from "./alert";
import { Badge } from "./badge";
import { Button } from "./button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";
import { Input } from "./input";
import { Label } from "./label";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableEmpty,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";
import { renderWithApp } from "@/test/mount";

describe("ui components", () => {
  it("renders basic shadcn-vue primitives", () => {
    renderWithApp({
      components: {
        Alert,
        AlertDescription,
        AlertTitle,
        Badge,
        Button,
        Card,
        CardAction,
        CardContent,
        CardDescription,
        CardFooter,
        CardHeader,
        CardTitle,
        Input,
        Label,
        Table,
        TableBody,
        TableCaption,
        TableCell,
        TableEmpty,
        TableFooter,
        TableHead,
        TableHeader,
        TableRow,
      },
      template: `
        <Card>
          <CardHeader>
            <CardTitle>标题</CardTitle>
            <CardDescription>说明</CardDescription>
            <CardAction><Badge>Action</Badge></CardAction>
          </CardHeader>
          <CardContent>
            <Badge>Ready</Badge>
            <Alert><AlertTitle>状态</AlertTitle><AlertDescription>提示</AlertDescription></Alert>
            <Label for="demo">账号</Label>
            <Input id="demo" />
            <Button>提交</Button>
            <Table>
              <TableHeader>
                <TableRow><TableHead>能力</TableHead></TableRow>
              </TableHeader>
              <TableBody>
                <TableRow><TableCell>SSR</TableCell></TableRow>
              </TableBody>
              <TableFooter>
                <TableRow><TableCell>合计</TableCell></TableRow>
              </TableFooter>
              <TableCaption>表格说明</TableCaption>
            </Table>
            <Table><TableEmpty>空表</TableEmpty></Table>
          </CardContent>
          <CardFooter>页脚</CardFooter>
        </Card>
      `,
    });

    expect(screen.getByText("标题")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "提交" })).toBeInTheDocument();
    expect(screen.getByText("SSR")).toBeInTheDocument();
  });
});
